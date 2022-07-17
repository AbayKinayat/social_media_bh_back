import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: "usersFriends" })
export class UsersFriends extends Model<UsersFriends> {

  @ApiProperty({ example: "1", description: "Идентификатор" })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false })
  id: number

  @ApiProperty({ example: "1", description: "Идентификатор пользователя" })
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number

  @ApiProperty({ example: "1", description: "Идентификатор дружественного пользователя" })
  @Column({ type: DataType.INTEGER, allowNull: false })
  friendId: number
}