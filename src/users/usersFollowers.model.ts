import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: "usersFollowers" })
export class UsersFollowers extends Model<UsersFollowers> {

  @ApiProperty({ example: "1", description: "Идентификатор" })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false })
  id: number

  @ApiProperty({ example: "1", description: "Идентификатор пользователя" })
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number

  @ApiProperty({ example: "1", description: "Идентификатор фолловера пользователя" })
  @Column({ type: DataType.INTEGER, allowNull: false })
  followerId: number
}