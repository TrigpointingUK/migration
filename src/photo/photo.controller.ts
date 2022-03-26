import { Controller, Get, Param } from '@nestjs/common';
import { PhotoService } from './photo.service';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.photoService.findOne(+id);
  }

}
