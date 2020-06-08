export class FaqDTO {
    id: number;                                         // Id do Faq
    question: string;                                   // Pegunta
    answer: string;                                     // Resposta
    order: number;                                      // Ordem do pergunta do FAQ
    status: number;                                     // Status do Faq (Ativo/Desativado)
    articlesFaq: FaqDTO[];                              // Lista de Redirecionamentos
}


