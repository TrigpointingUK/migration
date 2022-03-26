import { PartialType } from '@nestjs/mapped-types';
import { CreateApiphotoDto } from './create-apiphoto.dto';

export class UpdateApiphotoDto extends PartialType(CreateApiphotoDto) {}
