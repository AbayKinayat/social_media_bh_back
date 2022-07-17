import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tags } from 'src/tags/tags.model';
import { Users } from 'src/users/users.model';
import { Posts } from './posts.model';

@Injectable()
export class PostsService {

  constructor(
    @InjectModel(Posts) private postsRepository: typeof Posts,
    @InjectModel(Users) private usersRepository: typeof Users,
    @InjectModel(Tags) private tagsRepository: typeof Tags,
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

}
