import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiphotoService } from './apiphoto.service';

@Controller('apiphoto')
export class ApiphotoController {
  constructor(private readonly apiphotoService: ApiphotoService) {}

  @Get('syncall')
  syncAll(
    @Query('count') count: number = 10,
    @Query('start') start: number = 1,
  ) {
    return this.apiphotoService.syncAll(+start, +count);
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apiphotoService.findOne(+id);
  }


  @Get(':id/sync')
  syncOne(@Param('id') id: number) {
    return this.apiphotoService.syncOne(+id);
  }

}
