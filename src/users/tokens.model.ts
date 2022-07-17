import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ modelName: "tokens" })
export class Tokens extends Model<Tokens> {
  @ApiProperty({ example: "1", description: "Идентификатор токена" })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false })
  id: number

  @ApiProperty({ example: "1", description: "Идентификатор пользователя" })
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number

  @ApiProperty({ example: "hash", description: "Токен для обновления" })
  @Column({ type: DataType.TEXT, allowNull: false })
  refreshToken: string
}