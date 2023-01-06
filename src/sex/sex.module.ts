import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SexController } from './sex.controller';
import { Sex } from './sex.model';
import { SexService } from './sex.service';

@Module({
  controllers: [SexController],
  providers: [SexService],
  imports: [
    SequelizeModule.forFeature([
      Sex,
    ])
  ],
})
export class SexModule {
}
