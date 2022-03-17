import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiuserService } from './apiuser.service';

@Controller('apiuser')
export class ApiuserController {
  constructor(private readonly apiuserService: ApiuserService) {}

  @Get('syncall')
  syncAll(
    @Query('count') count: number = 10,
    @Query('start') start: number = 1,
  ) {
    return this.apiuserService.syncAll(+start, +count);
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apiuserService.findOne(+id);
  }


  @Get(':id/sync')
  syncOne(@Param('id') id: number) {
    return this.apiuserService.syncOne(+id);
  }

}
