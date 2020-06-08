export class CustomerAgreementPlataformTermsDTO {
    // Classe de aceite de dados do cliente ao termo da plataforma.
    // Para aceite do cliente, só é necessário preencher o campo "plataformTermId". O backend preenche o customerId
    id: number = undefined;
    plataformTermId: number = undefined;
    customerId: number = undefined;
    dateOfCreation: Date = undefined;
    dateOfExclusion: Date = undefined;
}
