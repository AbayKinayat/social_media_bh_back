import { Test, TestingModule } from '@nestjs/testing';
import { LangsController } from './langs.controller';

describe('LangsController', () => {
  let controller: LangsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LangsController],
    }).compile();

    controller = module.get<LangsController>(LangsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
