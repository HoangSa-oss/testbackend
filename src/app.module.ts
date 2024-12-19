import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './apis/auth/auth.module';
import { appSettings } from './configs/appsettings';
import { UsersModule } from './apis/users/users.module';
import { RolesModule } from './apis/roles/roles.module';
import { LoggingMiddleware } from './middlewares/logging.middleware';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { CamelCaseNamingConvention } from '@automapper/core';
import { AwsModule } from './apis/aws/aws.module';
import { PaymentModule } from './apis/payment/payment.module';
import { TransactionsModule } from './services/transactions/transactions.module';
import { TransactionHistoriesModule } from './services/transaction-histories/transaction-histories.module';
import { TransactionHookModule } from './apis/transaction-hook/transaction-hook.module';
import { MerchantModule } from './apis/merchant/merchant.module';
import { TopupModule } from './apis/topup/topup.module';
import { CacheModule } from '@nestjs/cache-manager';
import { TenantMiddleware } from './middlewares/tenant/tenant.middleware';
import { AdminModule } from './apis/admin/admin.module';
import { MailModule } from './services/mail/mail.module';
import { EMAIL } from './constants/string-constants';
// import * as redisStore from 'cache-manager-redis-store';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal:true,
            expandVariables:true,
        }),
        CacheModule.register({
            ttl: 5,
            max: 100,
            isGlobal: true,
        }),
        MongooseModule.forRoot(
            `${appSettings.mongoose.dbConn}/${appSettings.mongoose.dbName}`,
        ),
        AutomapperModule.forRoot([
            {
                name: 'classes',
                strategyInitializer: classes(),
                namingConventions: new CamelCaseNamingConvention(),
            },
        ]),
        AuthModule,
        UsersModule,
        RolesModule,
        AwsModule,
        PaymentModule,
        TransactionsModule,
        TransactionHistoriesModule,
        TransactionHookModule,
        MerchantModule,
        TopupModule,
        AdminModule,
        MailModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggingMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.ALL });
        consumer
            .apply(TenantMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
