import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrigService } from './trig.service';
import { TrigController } from './trig.controller';
import { Trig } from './entities/trig.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Trig])],
  controllers: [TrigController],
  providers: [TrigService],
  exports: [TrigService],
})
export class TrigModule {}
