import { Module } from '@nestjs/common';
import { ApilogService } from './apilog.service';
import { ApilogController } from './apilog.controller';
import { ConfigModule } from '@nestjs/config';
import { LogModule } from 'src/log/log.module';

@Module({
  imports: [ConfigModule, LogModule],
  controllers: [ApilogController],
  providers: [ApilogService]
})
export class ApilogModule {}
