import { PartialType } from '@nestjs/mapped-types';
import { Apiphoto } from '../entities/apiphoto.entity';

export class CreateApiphotoDto extends PartialType(Apiphoto) {}
