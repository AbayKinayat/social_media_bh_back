import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ modelName: "sex" })
export class Sex extends Model<Sex> {

  @ApiProperty({ example: "1", description: "Идентификатор пола" })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false })
  id: number

  @ApiProperty({ example: "Ұл", description: "Название пола на казахском" })
  @Column({ type: DataType.STRING, allowNull: false })
  nameKz: string

  @ApiProperty({ example: "Мужской", description: "Название пола на русском" })
  @Column({ type: DataType.STRING, allowNull: false })
  nameRu: string

  @ApiProperty({ example: "Man", description: "Название пола на англиском" })
  @Column({ type: DataType.STRING, allowNull: false })
  nameEn: string
}