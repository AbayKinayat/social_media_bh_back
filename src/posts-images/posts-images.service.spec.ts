import { Test, TestingModule } from '@nestjs/testing';
import { PostsImagesService } from './posts-images.service';

describe('PostsImagesService', () => {
  let service: PostsImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsImagesService],
    }).compile();

    service = module.get<PostsImagesService>(PostsImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
