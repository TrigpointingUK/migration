import { Module } from '@nestjs/common';
import { ApiphotoService } from './apiphoto.service';
import { ApiphotoController } from './apiphoto.controller';
import { ConfigModule } from '@nestjs/config';
import { PhotoModule } from 'src/photo/photo.module';

@Module({
  imports: [ConfigModule, PhotoModule],
  controllers: [ApiphotoController],
  providers: [ApiphotoService]
})
export class ApiphotoModule {}
