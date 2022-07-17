import { Test, TestingModule } from '@nestjs/testing';
import { SexController } from './sex.controller';

describe('SexController', () => {
  let controller: SexController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SexController],
    }).compile();

    controller = module.get<SexController>(SexController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
