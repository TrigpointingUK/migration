import { PartialType } from '@nestjs/mapped-types';
import { CreateApilogDto } from './create-apilog.dto';

export class UpdateApilogDto extends PartialType(CreateApilogDto) {}
