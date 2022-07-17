import { Module } from '@nestjs/common';
import { SexController } from './sex.controller';
import { SexService } from './sex.service';

@Module({
  controllers: [SexController],
  providers: [SexService]
})
export class SexModule {}
