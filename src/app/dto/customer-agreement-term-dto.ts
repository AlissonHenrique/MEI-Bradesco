import { CustomerFieldsDTO } from './customer-fields-dto';
import { CustomerAccessDTO } from './customer-access-dto';

export class CustomerAgreementTermDTO {
    partnerId: number;
    partnerName: string;
    partnerImage: string;
    partnerUrl: string;
    partnerUrlMenu: string;
    partnerUrlStatusNotification: string;
    about: string;
    contact: string;
    term: string;
    creationDate: Date;
    serviceUrl: string;
    serviceName: string;
    agreement: boolean;
    sharing: boolean;
    sharedFields: CustomerFieldsDTO[] = [];
    token: string;
    sharingTerm: string;
    validityDate: Date;
    customAccess: CustomerAccessDTO;
    termExpired: boolean;
    creationTime: Date;
}
