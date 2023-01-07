import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Posts } from 'src/posts/posts.model';
import { PostsImagesController } from './posts-images.controller';
import { PostsImages } from './posts-images.model';
import { PostsImagesService } from './posts-images.service';

@Module({
  controllers: [PostsImagesController],
  providers: [PostsImagesService],
  imports: [
    SequelizeModule.forFeature([
      Posts,
      PostsImages
    ])
  ]
})
export class PostsImagesModule {}
