import { FaqDTO } from './faq-dto';

export class FaqCategoryDTO {
    id: number;                                                      // Id da Categoria
    name: string;                                                  // Nome da Categoria
    order: number;                                                  // Ordem da Categoria
    faqs: Array<FaqDTO>; // Lista de Perguntas e respostas fdkfj
}
