import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: "tags" })
export class Tags extends Model<Tags> {

  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false })
  @ApiProperty({ example: "1", description: "Идентификатор тега" })
  id: number

  @Column({ type: DataType.STRING, allowNull: false })
  @ApiProperty({ example: "Табиғат", description: "Название на казахском" })
  nameKz: string

  @Column({ type: DataType.STRING, allowNull: false })
  @ApiProperty({ example: "Табиғат", description: "Название на русском" })
  nameRu: string

  @Column({ type: DataType.STRING, allowNull: false })
  @ApiProperty({ example: "Табиғат", description: "Название на английском" })
  nameEn: string

}