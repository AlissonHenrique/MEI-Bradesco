import { PartnerServicesDTO } from './partner-services-dto';
import { PartnerPresentationDTO } from './partner-presentation-dto';

export class PartnerDTO {
    id: number;
    cnpj: string;
    name: string;
    description: string;
    url: string;
    urlMenu: string;
    imageLogo: string;
    status: number;
    services: PartnerServicesDTO[];
    presentation: PartnerPresentationDTO;
    urlStatusNotification: string;
    connected: boolean;
    agreementId: number;
    servicesDescription: string; // propriedade não vem do back-end, é montada em tempo de execução.
    serviceIdSelected: number = undefined; // propriedade não vem do back-end, é montada em tempo de execução - usado na página de formalização
    descriptionAux: string; // propriedade não vem back-end
}
