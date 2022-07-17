import { Test, TestingModule } from '@nestjs/testing';
import { SexService } from './sex.service';

describe('SexService', () => {
  let service: SexService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SexService],
    }).compile();

    service = module.get<SexService>(SexService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
