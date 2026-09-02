export interface FaqItem {
  pergunta: string;
  resposta: string;
}

/**
 * Perguntas e respostas factuais e autocontidas — pensadas tanto para quem
 * lê na página quanto para buscadores de IA (GEO), que citam blocos de
 * pergunta/resposta com mais facilidade do que texto corrido.
 */
export const faq: FaqItem[] = [
  {
    pergunta: "O que é o Comitê Maranhão do Movimento Paulo Gustavo?",
    resposta:
      "É o Comitê Maranhão do Movimento Nacional de Trabalhadoras e Trabalhadores da Cultura Paulo Gustavo, um grupo de sociedade civil formado por fazedores e fazedoras de cultura do Maranhão. Ele não é órgão público: acompanha, articula e cobra do poder público estadual e municipal a execução da Lei Paulo Gustavo no Estado.",
  },
  {
    pergunta: "Quais editais da Lei Paulo Gustavo estão abertos no Maranhão?",
    resposta:
      "O Comitê reúne em comitepaulogustavo.ma/editais os editais de fomento à cultura abertos do Estado do Maranhão (SECMA) e do município de São Luís (SECULT-SL) — da Lei Paulo Gustavo e da Política Nacional Aldir Blanc (PNAB), programa federal irmão administrado pelas mesmas secretarias —, com link direto para a publicação oficial de cada um. A lista completa e sempre atualizada também pode ser conferida direto na SECMA e na Prefeitura de São Luís.",
  },
  {
    pergunta: "Como emitir certidão negativa para participar de edital cultural no Maranhão?",
    resposta:
      "É preciso, em geral, certidão negativa federal (Receita Federal/PGFN), estadual (SEFAZ-MA) e, para quem mora em São Luís, municipal (SEMFAZ). Pessoa jurídica também costuma precisar de Certificado de Regularidade do FGTS e Certidão Negativa de Débitos Trabalhistas. O Comitê reúne os links oficiais de emissão de cada uma em comitepaulogustavo.ma/certidoes.",
  },
  {
    pergunta: "O que é o Radar Cultural MA?",
    resposta:
      "É o cadastro de fazedores e fazedoras de cultura do Comitê Maranhão. Quem entra no Radar Cultural passa a ser indicado a produtores e curadores e recebe aviso de editais da sua linguagem artística e do seu município, em comitepaulogustavo.ma/radar-cultural.",
  },
  {
    pergunta: "Como participar do Comitê Maranhão do Movimento Paulo Gustavo?",
    resposta:
      "Basta entrar em um dos grupos de WhatsApp ou seguir o Instagram do Comitê, listados em comitepaulogustavo.ma/participe. Não é preciso ser filiado a nenhuma entidade — o Comitê é aberto a fazedores e fazedoras de cultura do Maranhão.",
  },
];
