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
    pergunta:
      "O que é o Comitê Maranhão do Movimento Nacional de Trabalhadoras e Trabalhadores da Cultura Paulo Gustavo?",
    resposta:
      "É o Comitê Maranhão do Movimento Nacional de Trabalhadoras e Trabalhadores da Cultura Paulo Gustavo, um grupo de sociedade civil formado por fazedores e fazedoras de cultura do Maranhão. Ele não é órgão público: acompanha, articula e cobra do poder público estadual e municipal a execução da Lei Paulo Gustavo no Estado.",
  },
  {
    pergunta: "Quais editais da Lei Paulo Gustavo estão abertos no Maranhão?",
    resposta:
      "Em comitepaulogustavo.ma/editais o Comitê reúne os editais de fomento à cultura abertos do Estado do Maranhão (SECMA) e do município de São Luís (SECULT-SL) — da Lei Paulo Gustavo e também da Política Nacional Aldir Blanc (PNAB), o programa federal irmão administrado pelas mesmas secretarias —, cada um com link direto pra publicação oficial. Pra lista sempre atualizada na fonte, é só ir direto na SECMA e na Prefeitura de São Luís.",
  },
  {
    pergunta: "Como emitir certidão negativa para participar de edital cultural no Maranhão?",
    resposta:
      "Em geral você vai precisar de certidão negativa federal (Receita Federal/PGFN), estadual (SEFAZ-MA) e, pra quem é de São Luís, municipal (SEMFAZ). Se tiver empresa, some a isso o Certificado de Regularidade do FGTS e a Certidão Negativa de Débitos Trabalhistas. O Comitê reúne o link oficial de emissão de cada uma em comitepaulogustavo.ma/certidoes.",
  },
  {
    pergunta: "O que é o Radar Cultural MA?",
    resposta:
      "É o cadastro de fazedores e fazedoras de cultura do Comitê. Quem se cadastra passa a ser indicado a produtores e curadores e recebe aviso de edital da sua linguagem artística e do seu município — o cadastro fica em comitepaulogustavo.ma/radar-cultural.",
  },
  {
    pergunta: "Como participar do Comitê?",
    resposta:
      "É só entrar em um dos grupos de WhatsApp ou seguir o Instagram do Comitê, listados em comitepaulogustavo.ma/participe. Não precisa ser filiado a entidade nenhuma — o Comitê é aberto a qualquer fazedor ou fazedora de cultura do Maranhão.",
  },
];
