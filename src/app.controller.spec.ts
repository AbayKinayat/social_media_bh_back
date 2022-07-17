import { Test, TestingModule } from '@nestjs/testing';
describe('AppController', () => {
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
    }).compile();
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
    });
  });
});
