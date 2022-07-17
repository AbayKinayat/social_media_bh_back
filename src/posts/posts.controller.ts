import { PostsService } from './posts.service';
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Посты")
@Controller('posts')
export class PostsController {

  constructor(
    private postsService: PostsService
  ) { }

  @ApiOperation({ summary: "Получить все посты" })
  @Get()
  async getPosts() {
    return this.postsService.getPosts();
  }

}
