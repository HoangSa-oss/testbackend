import { BadRequestException, Injectable } from '@nestjs/common';
import {
    STSClient,
    GetSessionTokenCommand,
    GetSessionTokenCommandInput,
    STSClientConfig,
} from '@aws-sdk/client-sts';
import { appSettings } from 'src/configs/appsettings';
import { SessionTokenModel } from './interfaces/session-token.interface';
import {
    S3Client,
    S3ClientConfig,
    PutObjectCommand,
    PutObjectCommandInput,
    CopyObjectCommandInput,
    CopyObjectCommand,
    GetObjectCommand,
    GetObjectCommandInput,
} from '@aws-sdk/client-s3';
import _ from 'lodash';
import path from 'path';

@Injectable()
export class AwsService {
    private readonly _client: STSClient;
    private readonly _s3: S3Client;

    /**
     *
     */
    constructor() {
        const { accessKeyId, secretAccessKey, region } = appSettings.s3;
        const credentialsConfig = {
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
        };
        const stsClientConfig: STSClientConfig = {
            credentials: credentialsConfig,
            region: region,
        };
        this._client = new STSClient(stsClientConfig);

        const s3ClientConfig: S3ClientConfig = {
            region: region,
            credentials: credentialsConfig,
        };
        this._s3 = new S3Client(s3ClientConfig);
    }

    async getSessionToken(): Promise<SessionTokenModel> {
        const { region, bucket, durationSeconds } = appSettings.s3;
        const input: GetSessionTokenCommandInput = {
            DurationSeconds: durationSeconds,
        };

        try {
            const command = new GetSessionTokenCommand(input);
            const response = await this._client.send(command);
            const { AccessKeyId, SecretAccessKey, SessionToken, Expiration } =
                response.Credentials;

            return {
                accessKey: AccessKeyId,
                secretKey: SecretAccessKey,
                sessionToken: SessionToken,
                region: region,
                bucket: bucket,
                expiration: Expiration,
            };
        } catch (error) {
            console.log('error', error);
            return error;
        }
    }

    async uploadFile(
        file: Express.Multer.File,
        fileName: string,
        path?: string,
    ) {
        try {
            const { bucket } = appSettings.s3;
            const key = path ? `${path}/${fileName}` : fileName;

            const uploadParams: PutObjectCommandInput = {
                Bucket: bucket,
                Key: key,
                Body: file.buffer,
                ACL: 'public-read',
                ContentType: file.mimetype,
            };
            const objectCommand = new PutObjectCommand(uploadParams);

            return await this._s3.send(objectCommand);
        } catch (error) {
            console.log('S3 error', error);
        }

        return undefined;
    }

    async uploadFileBuffer(
        file: Uint8Array | string,
        fileName: string,
        contentType: string,
        path?: string,
    ) {
        try {
            if (!file) {
                return undefined;
            }

            const { bucket, region } = appSettings.s3;
            const key = path ? `${path}/${fileName}` : fileName;

            const uploadParams: PutObjectCommandInput = {
                Bucket: bucket,
                Key: key,
                Body: file,
                ACL: 'public-read',
                ContentType: contentType,
            };
            const objectCommand = new PutObjectCommand(uploadParams);

            const data = await this._s3.send(objectCommand);

            let s3Url = '';
            if (data?.$metadata?.httpStatusCode == 200) {
                const pathFile = path ? `${path}/${fileName}` : fileName;
                s3Url = `https://${bucket}.s3.${region}.amazonaws.com/${pathFile}`;
            }

            if (!s3Url) {
                throw new BadRequestException('S3 upload error');
            }

            return s3Url;
        } catch (error) {
            console.log('S3 error', error);
        }

        return undefined;
    }

    async createFile(file: Express.Multer.File, path = 'temp') {
        try {
            if (!file) {
                return undefined;
            }
            const { bucket, region } = appSettings.s3;
            const data = await this.uploadFile(file, file.originalname, path);
            let s3Url = '';
            if (data?.$metadata?.httpStatusCode == 200) {
                const pathFile = path
                    ? `${path}/${file.originalname}`
                    : file.originalname;
                s3Url = `https://${bucket}.s3.${region}.amazonaws.com/${pathFile}`;
            }

            if (!s3Url) {
                throw new BadRequestException('S3 upload error');
            }

            return s3Url;
        } catch (error) {
            console.log('create file', error);
        }

        return undefined;
    }

    async createFileBuffer(
        file: Uint8Array,
        fileName: string,
        type: string,
        path = 'temp',
    ) {
        try {
            if (!file) {
                return undefined;
            }
            const { bucket, region } = appSettings.s3;
            const data = await this.uploadFileBuffer(
                file,
                fileName,
                'png',
                path,
            );
            let s3Url = '';
            if (data) {
                // const pathFile = path
                //     ? `${path}/${file.originalname}`
                //     : file.originalname;
                s3Url = data;
            }

            if (!s3Url) {
                throw new BadRequestException('S3 upload error');
            }

            return s3Url;
        } catch (error) {
            console.log('create file', error);
        }

        return undefined;
    }

    async moveFile(sourceUrl: string, toPath: string, mimetype: string) {
        try {
            const { bucket, region } = appSettings.s3;
            const baseUrl = `https://${bucket}.s3.${region}.amazonaws.com/`;
            const source = sourceUrl.replace(baseUrl, '');

            const key = `${toPath}/${path.basename(source)}`;
            const input: CopyObjectCommandInput = {
                Bucket: bucket,
                CopySource: `${bucket}/${source}`,
                ACL: 'public-read',
                ContentType: mimetype,
                Key: key,
            };
            const command = new CopyObjectCommand(input);
            const data = await this._s3.send(command);
            if (data?.$metadata?.httpStatusCode == 200) {
                return baseUrl + key;
            }
        } catch (error) {
            console.log('file', error);
        }

        return undefined;
    }

    async getS3File(sourceUrl: string) {
        try {
            const { bucket, region } = appSettings.s3;
            const baseUrl = `https://${bucket}.s3.${region}.amazonaws.com/`;
            const source = sourceUrl.replace(baseUrl, '');
            const input: GetObjectCommandInput = {
                Bucket: bucket,
                Key: source,
            };
            const command = new GetObjectCommand(input);
            const response = await this._s3.send(command);
            return response;
        } catch (error) {
            console.log('file', error);
        }

        return undefined;
    }
}
