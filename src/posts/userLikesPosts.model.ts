import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Users } from "src/users/users.model";
import { Posts } from "./posts.model";

@Table({ tableName: "usersLikesPosts" })
export class UsersLikesPosts extends Model<UsersLikesPosts> {

  @ApiProperty({ example: "1", description: "Идентификатор", required: true,})
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false })
  id: number

  @ApiProperty({ example: "1", description: "Идентификатор пользователя", required: true,})
  @ForeignKey(() => Users)
  userId: number

  @ApiProperty({ example: "1", description: "Идентификатор поста", required: true,})
  @ForeignKey(() => Posts)
  postId: number
} 
