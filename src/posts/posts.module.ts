import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { Sequelize } from 'sequelize/types';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Users } from 'src/users/users.model';
import { Posts } from './posts.model';
import { Tags } from 'src/tags/tags.model';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    SequelizeModule.forFeature([
      Users,
      Posts,
      Tags
    ])
  ]
})
export class PostsModule {}
