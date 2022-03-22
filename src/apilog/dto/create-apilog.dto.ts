import { PartialType } from '@nestjs/mapped-types';
import { Apilog } from '../entities/apilog.entity';

export class CreateApilogDto extends PartialType(Apilog) {}
