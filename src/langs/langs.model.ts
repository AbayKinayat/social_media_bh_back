import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Users } from "src/users/users.model";
import { UsersLangs } from "./users-langs.model";

@Table({ tableName: "langs" })
export class Langs extends Model<Langs> {

  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false })
  @ApiProperty({ example: "1", description: "Идентификатор языка" })
  id: number

  @ApiProperty({ example: "Русский", description: "Название языка на русском" })
  @Column({ type: DataType.STRING, allowNull: false })
  nameRu: string

  @ApiProperty({ example: "Орыс тілі", description: "Название языка на казахском" })
  @Column({ type: DataType.STRING, allowNull: false })
  nameKz: string

  @ApiProperty({ example: "Russian", description: "Название языка на английском" })
  @Column({ type: DataType.STRING, allowNull: false })
  nameEn: string

  @BelongsToMany(() => Users, () => UsersLangs)
  users: Users[]
}