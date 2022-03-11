import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Trig } from './entities/trig.entity';

@Injectable()
export class TrigService {
  constructor(
    @InjectRepository(Trig)
    private trigsRepository: Repository<Trig>,
  ) {}

  findAll() {
    return `This action returns all trig`;
  }

  async findOne(id: number) {
    return await this.trigsRepository.findOne(id);
  }
}
