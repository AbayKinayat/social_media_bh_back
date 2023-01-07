import { Test, TestingModule } from '@nestjs/testing';
import { PostsImagesController } from './posts-images.controller';

describe('PostsImagesController', () => {
  let controller: PostsImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsImagesController],
    }).compile();

    controller = module.get<PostsImagesController>(PostsImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
