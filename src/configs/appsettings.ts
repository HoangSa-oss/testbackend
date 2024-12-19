import 'dotenv/config';

export const appSettings = {
    port: process.env.PORT,
    development: process.env.DEVELOPMENT,
    cors: [
        {
            origin: process.env.CORS_ORIGIN,
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        },
        {
            origin: '*',
            methods: 'GET',
        },
    ],
    jwt: {
        secret: process.env.JWT_SECRET,
        issuer: process.env.ISSUER,
        expireIn: process.env.EXPIRE_IN,
        refreshExpireIn: process.env.REFRESH_EXPIRE_IN,
    },
    mongoose: {
        dbConn: process.env.MONGO_URL,
        dbName: process.env.DB_NAME,
    },
    serviceProviders: {
        facebook: {
            appId: process.env.FACEBOOK_APP_ID,
            appSecret: process.env.FACEBOOK_APP_SECRET,
            callbackUrl: process.env.FACEBOOK_CALLBACK_URL,
        },
        google: {
            appId: process.env.GOOGLE_APP_ID,
            appSecret: process.env.GOOGLE_APP_SECRET,
            callbackUrl: process.env.GOOGLE_CALLBACK_URL,
        },
    },
    s3: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        region: process.env.S3_REGION,
        bucket: process.env.S3_BUCKET,
        durationSeconds: Number(process.env.S3_DURATION_SECONDS),
    },
    configuration: {
        configurationId: process.env.CONFIGURATION_ID,
    },
    codeExpired: Number(process.env.CODE_EXPIRED),
    resetPasswordUrl: process.env.RESET_PASSWORD_URL,
};
