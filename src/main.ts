import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appSettings } from './configs/appsettings';
import passport from 'passport';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalPrefixOptions } from '@nestjs/common/interfaces';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { HttpException, HttpStatus, UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { getQueryParam, getWhiteListDomains } from '@/lib/mongo.helper';
import { AllExceptionsFilter } from './all-exceptions/all-exceptions.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const httpAdapter = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
    const routeExclude: GlobalPrefixOptions = {
        exclude: ['auth/([^\\s]+)'],
    };
    app.setGlobalPrefix('api', routeExclude);

    app.enableCors({
        origin: async function (origin, callback) {
//            const isCached = !!getQueryParam(origin, 'isCached');
//            const whitelist = await getWhiteListDomains(isCached);
//            const regexPattern = `^https?:\\/\\/(?:${whitelist.map((domain) => domain.replace('.', '\\.')).join('|')})(\\/.*)?$`;
//            const regex = new RegExp(regexPattern);
//            console.log(JSON.stringify({ origin, whitelist }));

 //           if (!origin || regex.test(origin)) {
                callback(null, true);
 //           } else {
 //               callback(
 //                   new UnprocessableEntityException(
 //                       'Not allowed by CORS',
 //                   ),
 //               );
//            }
        },
    });

    // Init Login interceptor
    app.useGlobalInterceptors(
        new LoggingInterceptor(),
        new TransformInterceptor(),
    );
    // app.use(session({ secret: 'melody hensley is my spirit animal' }));
//    app.use(passport.initialize());
    // app.use(passport.session());
    app.useGlobalPipes(
        new ValidationPipe({ transform: true, whitelist: false }), // temp
    );

    if (appSettings.development === 'true') {
        const config = new DocumentBuilder()
            .setTitle('Cats example')
            .setDescription('The cats API description')
            .setVersion('1.0')
            .build();

        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('swagger', app, document);
    }
    await app.listen(appSettings.port);
}
bootstrap();