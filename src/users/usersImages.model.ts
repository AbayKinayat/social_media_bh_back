import { UsersLikesImages } from './usersLikesImages.model';
import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Users } from "./users.model";

@Table({ tableName: "usersImages" })
export class UsersImages extends Model<UsersImages> {

  @ApiProperty({ example: "1", description: "Идентификатор изображения", required: true })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false })
  id: number

  @ApiProperty({ example: "Мы братья", description: "Название изображения", required: true })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string

  @ApiProperty({ example: "base64", description: "Изображение", required: true })
  @Column({ type: DataType.BLOB, allowNull: false })
  image: string

  @ApiProperty({ example: "10", description: "Просмотры", required: true })
  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  views: number

  @ApiProperty({ example: "1", description: "Идентификатор пользователя", required: true })
  @ForeignKey(() => Users)
  @Column({ type: DataType.INTEGER, allowNull: false })
  user_id: number

  @BelongsToMany(() => Users, () => UsersLikesImages)
  usersWhenLikes: Users[]
}