import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { TrigModule } from './trig/trig.module';
import { ApitrigModule } from './apitrig/apitrig.module';
import { ConfigModule } from '@nestjs/config';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

//  "entities": ["dist/**/*.entity{.ts,.js}"],
