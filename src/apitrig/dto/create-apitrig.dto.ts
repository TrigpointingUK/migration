import { PartialType } from '@nestjs/mapped-types';
import { Apitrig } from '../entities/apitrig.entity';

export class CreateApitrigDto extends PartialType(Apitrig) {}
