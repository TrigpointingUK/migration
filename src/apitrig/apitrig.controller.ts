import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApitrigService } from './apitrig.service';

@Controller('apitrig')
export class ApitrigController {
  constructor(private readonly apitrigService: ApitrigService) {}

  @Get('syncall')
  syncAll(
    @Query('count') count: number = 10,
    @Query('start') start: number = 1,
  ) {
    return this.apitrigService.syncAll(+start, +count);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.apitrigService.findOne(+id);
  }

  @Get(':id/sync')
  async syncOne(@Param('id') id: number) {
    return this.apitrigService.syncOne(+id);
  }
}
