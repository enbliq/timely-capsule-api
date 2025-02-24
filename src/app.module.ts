import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig, { validateConfig } from '../config/database.config';
import appConfig from '../config/config';
import * as crypto from 'crypto';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TransactionModule } from './transaction/transaction.module';
import { GuestModule } from './guest/guest.module';
import { CapsuleModule } from './capsule/capsule.module';
import { PaginationModule } from './common/pagination/pagination.module';
import { AdminModule } from './admin/admin.module';

(global as any).crypto = crypto;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV || 'development'}`],
      load: [databaseConfig, appConfig],
      validate: validateConfig,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    TransactionModule,
    GuestModule,
    CapsuleModule,
    PaginationModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
