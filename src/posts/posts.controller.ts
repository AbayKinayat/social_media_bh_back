import { UserDto } from 'src/users/dto/user-dto';
import { PostsService } from './posts.service';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import QueryDefaultDto from 'src/shared/dto/query-default.dto';
import { PostDto } from './dto/post.dto';
import { AccessTokenGuard } from 'src/guards/access-token.guard';
import { User } from 'src/decorators/user.decorator';

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

  @Get("user")
  @UseGuards(AccessTokenGuard)
  async getUserPosts(@User() user: UserDto, @Query() query: QueryDefaultDto<{ [Property in keyof PostDto]?: PostDto[Property] }>) {
    return this.postsService.getUserPosts(user.id, query);
  }

}
