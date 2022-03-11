import { PartialType } from '@nestjs/mapped-types';
import { CreateApitrigDto } from './create-apitrig.dto';

export class UpdateApitrigDto extends PartialType(CreateApitrigDto) {}
