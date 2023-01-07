import { PaginationService } from 'src/shared/services/pagination.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Users } from 'src/users/users.model';
import { Posts } from './posts.model';
import { Tags } from 'src/tags/tags.model';
import { PostsImages } from 'src/posts-images/posts-images.model';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PaginationService],
  imports: [
    SequelizeModule.forFeature([
      Users,
      Posts,
      Tags,
      PostsImages
    ])
  ]
})
export class PostsModule {}
