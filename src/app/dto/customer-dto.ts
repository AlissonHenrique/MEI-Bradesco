import { CustomerAdditionalDataDTO } from './customer-additional-data-dto';

export class CustomerDTO {

    constructor() {
        this.additionalData = new CustomerAdditionalDataDTO();
    }

    id: number = undefined;
    name: string = undefined;
    email: string = undefined;
    cpf: string = undefined;
    status: number = undefined;
    phoneNumber: string = undefined;
    reason: string = undefined;
    additionalData: CustomerAdditionalDataDTO;

}
