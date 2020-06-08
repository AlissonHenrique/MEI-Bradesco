// status == 0 conectado / 1 desconectado / 2 suspenso
// hasConnected == 0 Não / 1 Já se conectou em algum momento

export const parceiros = [
  {
    id: 0,
    name: "Dicas Mei",
    idModal: "mei",
    image: "assets/images/svg/parceiro-1.svg",
    images: {
      icon_01: {
        logo: "assets/images/svg/policy.svg",
        text: 'Formalização'
      },
      icon_02: {
        logo: "assets/images/svg/list-1.svg",
        text: 'Emissão do extrato do boleto DAS'
      },
      icon_03: {
        logo: "assets/images/svg/doc-folder.svg",
        text: 'DASN'
      },
      icon_04: {
        logo: "assets/images/svg/list.svg",
        text: 'Emissão de Nota fiscal de serviço (NFSe)'
      }
    },
    sobre:
      "A Dicas Mei surgiu para facilitar o dia a dia com um sistema de gestão de vendas 100% gratuito para o PME ser capaz de fazer todo o gerenciamento dos processos do negócio se maneira muito mais prática e rápida.",
    contato:
      "Avenida Angélica, 2529 - 7º andar - Bela Vista - São Paulo/SP - Brasil CEP: 01227-200 Suporte: +55 (11) 4780.7420 Parceria / Comercial: +55 (11) 4780.7424",
    description: {
      text_01: " Abertura do CNPJ MEI",
      text_02: "Declaração anual",
      text_03: "Emissão e pagamento do DAS",
    },
    needCNPJ: false,
    status: 0,
    hasConnected: 0,
    homeTitle: "Extrato do DAS",
    homeText: "Consulte o histórico de parcelas em aberto ou quitadas."
  },
  { 
    id: 1,
    name: "Market UP",
    idModal: "mkup",
    image: "assets/images/mk-up.png",

    images: {
      icon_01: {
        logo: "assets/images/svg/icon-bag.svg",
        text: 'PDV – módulo para vendas em balcão'
      },
      icon_02: {
        logo: "assets/images/svg/icon-basket.svg",
        text: 'Loja Virtual'
      },
      icon_03: {
        logo: "assets/images/svg/bar-chart.svg",
        text: 'ERP'
      },
      icon_04: {
        logo: "",
        text: ''
      }
    },

    sobre:
      "A Marketup oferece um sistema de gestão de vendas 100% grátis que permite gerenciar seu negócio de forma prática e segura.",
    contato:
      "Avenida Angélica, 2529 - 7º andar - Bela Vista - São Paulo/SP - Brasil CEP: 01227-200 Suporte: +55 (11) 4780.7420 Parceria / Comercial: +55 (11) 4780.7424",
    description: {
      text_01: " Emissão de nota fiscal",
      text_02: "Controle de estoque",
      text_03: "Loja virtual",
    },
    needCNPJ: false,
    status: 0,
    hasConnected: 1,
    homeTitle: "ERP",
    homeText: "Plataforma gratuita e on-line de gestão e vendas."
  },
  {
    id: 2,
    name: "Sebrae",
    idModal: "sebrae",
    image: "assets/images/svg/parceiro-3.svg",

    images: {
      icon_01: {
        logo: "assets/images/svg/cursos-sebrae.svg",
        text: 'Cursos à distância sobre <br> empreendedorismo e Gestão de Negócios'
      },
      icon_02: {
        logo: "",
        text: ''
      },
      icon_03: {
        logo: "",
        text: ''
      },
      icon_04: {
        logo: "",
        text: ''
      }
    },

    sobre:
      "O Serviço Brasileiro de Apoio às Micro e Pequenas Empresas (Sebrae) tem como principal objetivo auxiliar as micro e pequenas empresas e estimular o empreendedorismo no Brasil.",
    contato:
      "Avenida Angélica, 2529 - 7º andar - Bela Vista - São Paulo/SP - Brasil CEP: 01227-200 Suporte: +55 (11) 4780-7420 Parceria / Comercial: +55 (11) 4780-7424",
    description: {
      text_01:
        " Cursos a distância sobre empreendedorismo, gestão de negócios e muito mais.",
    },
    needCNPJ: true,
    status: 0,
    hasConnected: 1,
    homeTitle: "Abertura de CNPJ",
    homeText:
      "Lorem ipsum dolor sit amet, conseteur sadipscing elitr, sed diam nonumy."
  }
];
