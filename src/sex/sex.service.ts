import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { Sex } from './sex.model';


@Injectable()
export class SexService {

  constructor(
    @InjectModel(Sex) private sexRepository: typeof Sex
  ) { }

  getAll(): Promise<Sex[]> {
    return this.sexRepository.findAll();
  }
}
