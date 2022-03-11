import { Controller, Get, Param } from '@nestjs/common';
import { TrigService } from './trig.service';

@Controller('trig')
export class TrigController {
  constructor(private readonly trigService: TrigService) {}

  @Get()
  findAll() {
    return this.trigService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trigService.findOne(+id);
  }
}
