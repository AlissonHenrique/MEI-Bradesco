export class PartnerUserAgreementDTO {
    id: number;
    userId: number;
    partnerId: number;
    termAcceptedId: number;
    agreementAccepted: boolean;
    userHashIdentifier: string;
    userEnvironmentData: any;
    sharingAgreementAccepted: boolean;
    token: string;
    customAccess: string;
}
