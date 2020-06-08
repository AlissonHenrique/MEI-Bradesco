import { PartnerServicesDTO } from './partner-services-dto';
import { PartnerDTO } from './partner-dto';

export class CategoryViewDTO {
    services: Array<PartnerServicesDTO>;
    partners: Array<PartnerDTO>;
}
