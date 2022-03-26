import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Photo } from './entities/photo.entity';


@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>,
  ) {}

  async findOne(id: number) {
    return await this.photoRepository
    .createQueryBuilder('photo')
    .select(['photo.*', 'tlog.trig_id as trig_id', 'tlog.user_id as user_id'])
    .where('photo.id = :id', {id})
    .andWhere('photo.tlog_id = tlog.id', {id})
    .innerJoin('tlog', 'tlog')
    .getRawOne()
  }

}
