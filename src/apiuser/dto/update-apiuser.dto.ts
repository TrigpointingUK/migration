import { PartialType } from '@nestjs/mapped-types';
import { CreateApiuserDto } from './create-apiuser.dto';

export class UpdateApiuserDto extends PartialType(CreateApiuserDto) {}
