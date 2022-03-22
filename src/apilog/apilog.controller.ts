import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApilogService } from './apilog.service';

@Controller('apilog')
export class ApilogController {
  constructor(private readonly apilogService: ApilogService) {}

  @Get('syncall')
  syncAll(
    @Query('count') count: number = 10,
    @Query('start') start: number = 1,
  ) {
    return this.apilogService.syncAll(+start, +count);
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apilogService.findOne(+id);
  }


  @Get(':id/sync')
  syncOne(@Param('id') id: number) {
    return this.apilogService.syncOne(+id);
  }

}
