export class CustomerAdditionalDataDTO {

    birthDate: Date = undefined;
    cnpj: string = undefined;
    motherName: string = undefined; // motherName
    fatherName: string = undefined; // fatherName
    gender: string = undefined // sex
    maritalStatus: string = undefined // civilStatus
    companyTradeName: string = undefined // fantasyName
    companyLegalName: string = undefined  // socialName
    companyFoundationDate: Date = undefined; //startDate
    companyNire: number = undefined; // nireNumber

    drvLicense: number  // registerNumberCNH
    drvLicenseIssuerCode: number = undefined; // emitterCNH 
    drvLicenseExpirationDate: Date = undefined; // maturityDate  --vencimento
    drvLicenseIssueDate: Date = undefined; //  emissionDateCNH  -- Emissão da CNH
    drvLicenceIssuerState: string = undefined; // ufCNH

    idCard: number = undefined;  // registerNumberRG
    idCardIssuerCode: string = undefined;  // emitterRG -- orgão emissor
    idCardIssuerState: string = undefined; // ufRG
    idCardIssueDate: Date = undefined; // emissionDateRG

    country: string = undefined; // country
    typeAddress: number = undefined;
    city: string = undefined;
    state: string = undefined;
    postalCode: string = undefined;
    street: string = undefined;
    number: string = undefined;
    complement: string = undefined;
    neighborhood: string = undefined;

    businessPhoneNumber: string = undefined; // companyPhone

    isUnknownFather:number = undefined;   // Caso o nome do pai de um cliente micro empreendedor indivudual seja desconhecido o código indicador receberá valor igual a 1
    isUnknownMother: number = undefined;  // Caso o nome da mãe de um cliente micro empreendedor indivudual seja desconhecido o código indicador receberá valor igual a 1

}
