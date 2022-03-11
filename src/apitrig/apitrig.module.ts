import { Module } from '@nestjs/common';
import { ApitrigService } from './apitrig.service';
import { ApitrigController } from './apitrig.controller';
import { ConfigModule } from '@nestjs/config';
import { TrigModule } from 'src/trig/trig.module';

@Module({
  imports: [ConfigModule, TrigModule],
  controllers: [ApitrigController],
  providers: [ApitrigService],
})
export class ApitrigModule {}
