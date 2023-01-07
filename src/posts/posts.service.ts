import { PostsImages } from 'src/posts-images/posts-images.model';
import { PaginationService, type IPaginationData } from './../shared/services/pagination.service';
import QueryDefaultDto from 'src/shared/dto/query-default.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tags } from 'src/tags/tags.model';
import { Users } from 'src/users/users.model';
import { Posts } from './posts.model';
import { PostDto } from './dto/post.dto';
import { filter } from 'rxjs';

@Injectable()
export class PostsService {

  constructor(
    @InjectModel(Posts) private postsRepository: typeof Posts,
    @InjectModel(Users) private usersRepository: typeof Users,
    @InjectModel(Tags) private tagsRepository: typeof Tags,
    @InjectModel(PostsImages) private postsImagesRepository: typeof PostsImages,
    private paginationService: PaginationService
  ) { }

  async getPosts(): Promise<Posts[]> {
    const posts = await this.postsRepository.findAll({
      attributes: {
        exclude: [
          "userId",
          "tagId",
        ]
      },
      include: [
        {
          model: this.usersRepository,
          as: "userMember",
          attributes: [
            "id", "firstName", "lastName"
          ]
        },
        {
          model: this.usersRepository,
          as: "usersWhenLikes",
          attributes: [
            "id", "firstName", "lastName",
          ],
        },
        {
          model: this.tagsRepository,
          as: "tag"
        },
      ]
    });

    return posts;
  }

  async getUserPosts(userId: number, query: QueryDefaultDto<{ [Property in keyof PostDto]?: PostDto[Property] }>): Promise<IPaginationData<Posts>> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const offset = this.paginationService.calcOffset(limit, page);

    const modelOptions: {
      where: { [key: string]: any },
      limit: number,
      offset: number,
      order?: [string, string][],
      include: any
    } = {
      where: {},
      limit,
      offset,
      include: {
        all: true
      }
    };

    for (const key in query.filter) {
      const field = query.filter[key];

      modelOptions.where[key] = field;
    }
    modelOptions.where.userId = userId;

    if (query.sortName && query.sortOrder) {
      modelOptions.order = [[query.sortName, query.sortOrder]];
    }

    const data = await this.postsRepository.findAndCountAll(modelOptions);

    const paginationData = this.paginationService.generatePaginationData(data.rows, data.count, limit);

    return paginationData;
  }

}
