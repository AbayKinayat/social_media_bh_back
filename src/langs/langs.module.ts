import { Module } from '@nestjs/common';
import { LangsController } from './langs.controller';
import { LangsService } from './langs.service';

@Module({
  controllers: [LangsController],
  providers: [LangsService]
})
export class LangsModule {}
