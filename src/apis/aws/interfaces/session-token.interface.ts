export interface SessionTokenModel {
    accessKey: string;
    secretKey: string;
    sessionToken: string;
    region: string;
    bucket: string;
    expiration: Date;
}
