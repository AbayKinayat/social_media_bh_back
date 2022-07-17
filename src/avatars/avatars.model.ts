import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Users } from "src/users/users.model";

@Table({ modelName: "avatars" })
export class Avatars extends Model<Avatars> {

  @ApiProperty({ example: "1", description: "Идентификатор аватара" })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false })
  id: number

  @ApiProperty({ example: "BLOB", description: "Изображение" })
  @Column({ type: DataType.BLOB, allowNull: false })
  image: string

  @ApiProperty({ example: "20", description: "Просмотры" })
  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  views: number

  @ApiProperty({ example: "20", description: "Лайки" })
  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  likes: number

  @ApiProperty({ example: "1", description: "Идентификатор пользователя" })
  @ForeignKey(() => Users)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number
}