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
    pergunta: "Tem edital da Lei Paulo Gustavo aberto agora no Maranhão?",
    resposta:
      "Não sempre — e é bom checar antes de sair procurando. Na página de editais deste site o Comitê mostra o que está de fato aberto agora no Estado (SECMA) e em São Luís (SECULT-SL), identificando se é um edital da própria Lei Paulo Gustavo ou da Política Nacional Aldir Blanc (PNAB), o programa federal irmão administrado pelas mesmas secretarias — as duas coisas não são a mesma lei, e o site nunca apresenta uma pela outra. Pra conferir direto na fonte oficial, sem depender do Comitê pra isso, veja a SECMA e a Prefeitura de São Luís.",
  },
  {
    pergunta: "Como emitir certidão negativa para participar de edital cultural no Maranhão?",
    resposta:
      "Em geral você vai precisar de certidão negativa federal (Receita Federal/PGFN), estadual (SEFAZ-MA) e, pra quem é de São Luís, municipal (SEMFAZ). Se tiver empresa, some a isso o Certificado de Regularidade do FGTS e a Certidão Negativa de Débitos Trabalhistas. O Comitê reúne o link oficial de emissão de cada uma na página de certidões deste site.",
  },
  {
    pergunta: "O que é o Radar Cultural MA?",
    resposta:
      "É o mapa de quem faz cultura no Maranhão, mantido pelo Comitê. Cada pino é uma pessoa, um coletivo ou uma organização que se cadastrou: clicando na foto aparece o que ela faz e um botão que abre conversa direto no WhatsApp dela. Quem se cadastra passa a ser encontrado por produtores e curadores e recebe aviso de edital da sua linguagem artística e do seu município. O mapa e o cadastro ficam na página do Radar Cultural deste site.",
  },
  {
    pergunta: "Como participar do Comitê?",
    resposta:
      "É só entrar em um dos grupos de WhatsApp ou seguir o Instagram do Comitê, listados na página Participe deste site. Não precisa ser filiado a entidade nenhuma — o Comitê é aberto a qualquer fazedor ou fazedora de cultura do Maranhão.",
  },
];
