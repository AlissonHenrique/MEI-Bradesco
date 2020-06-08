export class CustomerFieldsDTO {
    id: number;
    description: string;
    value: string;

    constructor(id: number, description: string, value: string) {
        this.id = id;
        this.description = description;
        this.value = value;
    }
}
