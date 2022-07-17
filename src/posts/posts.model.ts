import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Tags } from "src/tags/tags.model";
import { Users } from "src/users/users.model";
import { UsersLikesPosts } from "./userLikesPosts.model";

@Table({ tableName: "posts" })
export class Posts extends Model<Posts> {

  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false })
  @ApiProperty({ example: "1", description: "Идентификатор поста" })
  id: number

  @Column({ type: DataType.STRING, allowNull: false })
  @ApiProperty({ example: "Природная катастрофа", description: "Заголовок поста" })
  title: string

  @Column({ type: DataType.TEXT, allowNull: false })
  @ApiProperty({ example: "Сегодня произашла ...", description: "Описание поста" })
  description: string

  @ForeignKey(() => Users)
  @Column({ type: DataType.INTEGER, allowNull: false })
  @ApiProperty({ example: "1", description: "Идентификатор пользователя который создал пост" })
  userId: number

  @BelongsTo(() => Users)
  @ApiProperty({ description: "Пользователь который создал пост" })
  userMember: Users

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  @ApiProperty({ example: "10", description: "Просмотры поста" })
  views: number

  @ForeignKey(() => Tags)
  @Column({ type: DataType.INTEGER, allowNull: false })
  @ApiProperty({ example: "10", description: "Идентификатор тега" })
  tagId: number

  @BelongsTo(() => Tags)
  @ApiProperty({ example: "Природа", description: "Тег поста" })
  tag: Tags

  @ApiProperty({ description: "Пользователи которые лайкнули пост" })
  @BelongsToMany(() => Users, () => UsersLikesPosts)
  usersWhenLikes: Users[]
}