import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo } from 'sequelize-typescript';
import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Posts } from 'src/posts/posts.model';

@Table({ tableName: 'posts_images' })
export class PostsImages extends Model<PostsImages> {

  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false })
  @ApiProperty({ example: "1", description: "Идентификатор" })
  id: number

  @Column({ type: DataType.TEXT, allowNull: false })
  @ApiProperty({ example: "image//base64;asdasd12e", description: "Изображение в тексте" })
  image: string

  @ForeignKey(() => Posts)
  @Column({ type: DataType.INTEGER, allowNull: false, references: { model: "posts", key: "id" } })
  @ApiProperty({ example: "4", description: "Идентификатор поста которому принадлежит изображение" })
  postId: number

  @BelongsTo(() => Posts, "postId")
  @ApiProperty({ example: "Пост", description: "Пост которому принадлежит изображение" })
  post: Posts

}