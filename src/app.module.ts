import { PaginationService } from './shared/services/pagination.service';
import { UsersImages } from './users/usersImages.model';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { SexModule } from './sex/sex.module';
import { Sex } from './sex/sex.model';
import { AvatarsModule } from './avatars/avatars.module';
import { Avatars } from './avatars/avatars.model';
import { Users } from './users/users.model';
import { Tokens } from './users/tokens.model';
import { AuthModule } from './auth/auth.module';
import { LangsModule } from './langs/langs.module';
import { Langs } from './langs/langs.model';
import { UsersLangs } from './langs/users-langs.model';
import { PostsModule } from './posts/posts.module';
import { Posts } from './posts/posts.model';
import { TagsModule } from './tags/tags.module';
import { Tags } from './tags/tags.model';
import { UsersLikesPosts } from './posts/userLikesPosts.model';
import { UsersLikesImages } from './users/usersLikesImages.model';
import { UsersFriends } from './users/usersFriends.model';
import { UsersFollowers } from './users/usersFollowers.model';
import { PostsImagesModule } from './posts-images/posts-images.module';
import { PostsImages } from './posts-images/posts-images.model';

let envFilePath = ".development.env";

if (process.env.ENVIRONMENT === "PRODUCTION") {
  envFilePath = ".production.env";
}

console.log(envFilePath)

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_DB_HOST,
      port: Number(process.env.POSTGRES_DB_PORT),
      username: process.env.POSTGRES_DB_USERNAME,
      password: process.env.POSTGRES_DB_PASSWORD,
      database: process.env.POSTGRES_DB_NAME,
      models: [
        Sex, 
        Avatars, 
        Users, 
        Tokens, 
        Langs, 
        UsersLangs, 
        Posts, 
        Tags,
        UsersLikesPosts,
        UsersLikesImages,
        UsersImages,
        UsersFriends,
        UsersFollowers,
        PostsImages
      ],
      autoLoadModels: true,
      synchronize: true
    }),
    SexModule,
    AvatarsModule,
    AuthModule,
    LangsModule,
    PostsModule,
    TagsModule,
    PostsImagesModule,
  ]
})
export class AppModule { }
