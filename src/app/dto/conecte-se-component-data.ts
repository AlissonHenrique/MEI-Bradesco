import { PartnerDTO } from './partner-dto';

// classe para enviar dados para a página conecte-se
export class ConecteSeComponentData {
    categoryId = 0;
    partners: Array<PartnerDTO> = [];
    serviceDescription: string = undefined;
    serviceId = 0;
}
