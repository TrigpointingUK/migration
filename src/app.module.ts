import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { TrigModule } from './trig/trig.module';
import { ApitrigModule } from './apitrig/apitrig.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ApiuserModule } from './apiuser/apiuser.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    ConfigModule.forRoot(),
    TrigModule,
    ApitrigModule,
    UserModule,
    ApiuserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
