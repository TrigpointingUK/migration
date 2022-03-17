import { PartialType } from '@nestjs/mapped-types';
import { Apiuser } from '../entities/apiuser.entity';

export class CreateApiuserDto extends PartialType(Apiuser) {}
