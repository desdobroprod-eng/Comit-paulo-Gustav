/**
 * Radar Cultural — endpoint do Comitê Maranhão do Movimento Nacional de
 * Trabalhadoras e Trabalhadores da Cultura Paulo Gustavo.
 *
 * COMO INSTALAR (uma vez só, dá pra fazer pelo celular)
 * 1. Abra a planilha que vai guardar os cadastros.
 * 2. Extensões → Apps Script. Apague o que estiver lá e cole este arquivo.
 * 3. Salve. Depois: Implantar → Nova implantação → tipo "App da Web".
 *    - Executar como: Eu
 *    - Quem pode acessar: QUALQUER PESSOA
 * 4. Copie a URL da implantação (termina em /exec).
 * 5. No GitHub do site: Settings → Secrets and variables → Actions → Variables
 *    → New variable → nome NEXT_PUBLIC_RADAR_ENDPOINT, valor a URL copiada.
 *
 * Ao trocar este código, é preciso IMPLANTAR DE NOVO (Implantar → Gerenciar
 * implantações → editar → Nova versão). Salvar sozinho não publica.
 *
 * SOBRE SEGURANÇA: este endereço é público por natureza — o navegador de
 * qualquer visitante chama ele pra cadastrar e pra desenhar o mapa. Por isso
 * nenhuma senha mora aqui, e toda validação feita no site é refeita aqui: o
 * que o navegador manda nunca é confiável.
 */

var ABA = "Cadastros";
var PASTA_FOTOS = "Radar Cultural — fotos";

/** Ordem das colunas na planilha. Mexeu aqui, mexa no cabeçalho da aba junto. */
var COLUNAS = [
  "Carimbo",
  "ID",
  "Publicar", // SIM tira do ar quando vira NÃO — é o freio de mão do Comitê
  "Tipo",
  "Nome",
  "Linguagens",
  "Município",
  "Bairro",
  "Sobre",
  "Foto",
  "WhatsApp",
  "Instagram",
  "Site",
  "Atua desde",
  "Lat",
  "Lng",
  "E-mail (não vai pro site)",
];

/** Maranhão com uma folga na borda. Pino fora disso é engano ou brincadeira. */
var LIMITES = { latMin: -11.0, latMax: -0.5, lngMin: -49.5, lngMax: -41.0 };

var LINGUAGENS_VALIDAS = [
  "Bumba meu boi",
  "Tambor de Crioula",
  "Dança",
  "Música",
  "Teatro",
  "Audiovisual",
  "Artes visuais",
  "Literatura",
  "Artesanato",
  "Cultura popular e tradicional",
  "Circo",
  "Produção cultural",
  "Outra",
];

var TIPOS_VALIDOS = ["pessoa", "coletivo", "organizacao"];

// ---------------------------------------------------------------------------
// Leitura — o mapa do site chama isto ao abrir a página
// ---------------------------------------------------------------------------

function doGet() {
  var aba = pegarAba();
  var valores = aba.getDataRange().getValues();
  var saida = [];

  // Linha 0 é o cabeçalho.
  for (var i = 1; i < valores.length; i++) {
    var linha = valores[i];
    var publicar = String(linha[2] || "").trim().toUpperCase();
    if (publicar !== "SIM") continue; // é aqui que o freio de mão pega

    // Só as colunas públicas saem daqui. E-mail fica na planilha, ponto.
    saida.push({
      id: String(linha[1]),
      tipo: String(linha[3]),
      nome: String(linha[4]),
      linguagens: String(linha[5]).split(";").map(aparar).filter(Boolean),
      municipio: String(linha[6]),
      bairro: String(linha[7]) || undefined,
      sobre: String(linha[8]),
      foto: String(linha[9]) || undefined,
      whatsapp: String(linha[10]) || undefined,
      instagram: String(linha[11]) || undefined,
      site: String(linha[12]) || undefined,
      atuaDesde: linha[13] ? Number(linha[13]) : undefined,
      lat: Number(linha[14]),
      lng: Number(linha[15]),
      cadastradoEm: linha[0] ? new Date(linha[0]).toISOString() : "",
    });
  }

  return json(saida);
}

// ---------------------------------------------------------------------------
// Escrita — o formulário do site chama isto ao enviar
// ---------------------------------------------------------------------------

function doPost(e) {
  try {
    var dados = JSON.parse(e.postData.contents);

    // Armadilha de robô: o campo fica escondido no formulário, então gente não
    // preenche. E ninguém honesto termina o formulário em menos de 5 segundos.
    if (aparar(dados.apelido)) return json({ ok: false, erro: "recusado" });
    if (Number(dados.segundosPreenchendo) < 5) return json({ ok: false, erro: "recusado" });

    if (!dados.consentimento) return json({ ok: false, erro: "sem-consentimento" });

    var nome = aparar(dados.nome);
    if (nome.length < 2 || nome.length > 120) return json({ ok: false, erro: "nome" });

    var tipo = TIPOS_VALIDOS.indexOf(dados.tipo) >= 0 ? dados.tipo : "pessoa";

    var sobre = aparar(dados.sobre);
    if (sobre.length < 20 || sobre.length > 280) return json({ ok: false, erro: "sobre" });

    var escolhidas = (dados.linguagens || []).filter(function (l) {
      return LINGUAGENS_VALIDAS.indexOf(l) >= 0;
    });
    if (escolhidas.length === 0) return json({ ok: false, erro: "linguagens" });

    var municipio = aparar(dados.municipio);
    if (municipio.length < 2) return json({ ok: false, erro: "municipio" });

    var lat = Number(dados.lat);
    var lng = Number(dados.lng);
    if (
      !isFinite(lat) ||
      !isFinite(lng) ||
      lat < LIMITES.latMin ||
      lat > LIMITES.latMax ||
      lng < LIMITES.lngMin ||
      lng > LIMITES.lngMax
    ) {
      return json({ ok: false, erro: "fora-do-maranhao" });
    }

    var whatsapp = String(dados.whatsapp || "").replace(/\D/g, "");
    if (whatsapp && (whatsapp.length < 10 || whatsapp.length > 13)) {
      return json({ ok: false, erro: "whatsapp" });
    }
    // Número brasileiro sem DDI: o wa.me precisa do 55 na frente.
    if (whatsapp && whatsapp.length <= 11) whatsapp = "55" + whatsapp;

    var instagram = aparar(dados.instagram).replace(/^@/, "").replace(/\s/g, "");
    if (!whatsapp && !instagram) return json({ ok: false, erro: "sem-contato" });

    var id = gerarId(nome);

    // Uma escrita por vez: dois envios ao mesmo tempo escreveriam na mesma linha.
    var trava = LockService.getScriptLock();
    trava.waitLock(20000);
    try {
      var aba = pegarAba();
      if (jaExiste(aba, nome, whatsapp)) return json({ ok: false, erro: "duplicado" });

      aba.appendRow([
        new Date(),
        id,
        "SIM",
        tipo,
        nome,
        escolhidas.join("; "),
        municipio,
        aparar(dados.bairro),
        sobre,
        salvarFoto(dados.fotoBase64, id),
        whatsapp,
        instagram,
        aparar(dados.siteLink),
        dados.atuaDesde ? Number(dados.atuaDesde) : "",
        lat,
        lng,
        aparar(dados.email),
      ]);
    } finally {
      trava.releaseLock();
    }

    return json({ ok: true, id: id });
  } catch (erro) {
    return json({ ok: false, erro: String(erro) });
  }
}

// ---------------------------------------------------------------------------
// Apoio
// ---------------------------------------------------------------------------

function json(objeto) {
  return ContentService.createTextOutput(JSON.stringify(objeto)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

function aparar(valor) {
  return String(valor == null ? "" : valor).trim();
}

/** Devolve a aba de cadastros, criando-a com o cabeçalho se ainda não existir. */
function pegarAba() {
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var aba = planilha.getSheetByName(ABA);
  if (!aba) {
    aba = planilha.insertSheet(ABA);
    aba.appendRow(COLUNAS);
    aba.setFrozenRows(1);
  }
  return aba;
}

function gerarId(nome) {
  var base = nome
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
  return base + "-" + Utilities.getUuid().slice(0, 6);
}

/** Evita o cadastro repetido de quem apertou enviar duas vezes. */
function jaExiste(aba, nome, whatsapp) {
  var valores = aba.getDataRange().getValues();
  for (var i = 1; i < valores.length; i++) {
    var mesmoNome = String(valores[i][4]).trim().toLowerCase() === nome.toLowerCase();
    var mesmoZap = whatsapp && String(valores[i][10]) === whatsapp;
    if (mesmoNome || mesmoZap) return true;
  }
  return false;
}

/**
 * Guarda a foto no Drive e devolve a miniatura pública. O site já manda a
 * imagem recortada em 512px, então não há redimensionamento a fazer aqui.
 */
function salvarFoto(base64, id) {
  if (!base64 || base64.indexOf("data:image/") !== 0) return "";
  try {
    var partes = base64.split(",");
    var bytes = Utilities.base64Decode(partes[1]);
    var blob = Utilities.newBlob(bytes, "image/jpeg", id + ".jpg");

    var pastas = DriveApp.getFoldersByName(PASTA_FOTOS);
    var pasta = pastas.hasNext() ? pastas.next() : DriveApp.createFolder(PASTA_FOTOS);

    var arquivo = pasta.createFile(blob);
    arquivo.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    return "https://drive.google.com/thumbnail?id=" + arquivo.getId() + "&sz=w400";
  } catch (erro) {
    // Cadastro sem foto é melhor que cadastro perdido: o pino cai na inicial.
    return "";
  }
}
