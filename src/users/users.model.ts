import { UsersLikesImages } from './usersLikesImages.model';
import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Avatars } from "src/avatars/avatars.model";
import { Langs } from "src/langs/langs.model";
import { UsersLangs } from "src/langs/users-langs.model";
import { Posts } from "src/posts/posts.model";
import { UsersLikesPosts } from "src/posts/userLikesPosts.model";
import { Sex } from "src/sex/sex.model";
import { UsersImages } from "./usersImages.model";

interface UserCreationAttrs {
  email: string,
  password: string
}

@Table({ tableName: "users" })
export class Users extends Model<Users, UserCreationAttrs> {

  @ApiProperty({ example: "1", description: "Идентификатор пользователя" })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false })
  id: number

  @ApiProperty({ example: "Иван", description: "Имя пользователя" })
  @Column({ type: DataType.STRING, allowNull: false })
  firstName: string

  @ApiProperty({ example: "Иванов", description: "Фамилия пользователя" })
  @Column({ type: DataType.STRING, allowNull: false })
  lastName: string

  @ApiProperty({ example: "Иванович", description: "Отчество пользователя", required: false })
  @Column({ type: DataType.STRING, allowNull: true })
  secondName: string

  @ApiProperty({ example: "+8777777777777", description: "Телефон пользователя", required: false })
  @Column({ type: DataType.STRING, allowNull: true })
  phone: string

  @ApiProperty({ example: "example@example.com", description: "Электронная почта пользователя" })
  @Column({ type: DataType.STRING, allowNull: true, unique: true })
  email: string

  @Column({ type: DataType.STRING, allowNull: false })
  password: string

  @ApiProperty({ example: "1", description: "Идентификатор пола пользователя" })
  @ForeignKey(() => Sex)
  @Column({ type: DataType.INTEGER, allowNull: true })
  sexId: number

  @ApiProperty({ example: "Мужской", description: "Пол пользователя", required: false })
  @BelongsTo(() => Sex)
  sex: Sex;

  @ApiProperty({ example: "12.12.2000", description: "Дата рождения пользователя", required: false })
  @Column({ type: DataType.DATE, allowNull: true })
  dateBirth: Date

  @ApiProperty({ example: "true", description: "Забанен ли пользователь", required: false })
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  isBan: boolean

  @ApiProperty({ example: "base64", description: "Аватар пользователя", required: false })
  @HasOne(() => Avatars)
  avatar: Avatars

  @BelongsToMany(() => Langs, () => UsersLangs)
  @ApiProperty({ description: "Языки которые знает пользователь" })
  langs: Langs[]

  @HasMany(() => Posts)
  @ApiProperty({ description: "Посты пользователя которые он создал" })
  posts: Posts[]

  @ApiProperty({ description: "Посты которые пользователь лайкнул" })
  @BelongsToMany(() => Posts, () => UsersLikesPosts)
  postsWhenLikes: Posts[]

  @ApiProperty({ description: "Изображения пользователя" })
  @HasMany(() => UsersImages)
  images: UsersImages[]

  @ApiProperty({ description: "Изображения которые пользователь лайкал" })
  @BelongsToMany(() => UsersImages, () => UsersLikesImages)
  imagesWhenLikes: UsersImages[]
}