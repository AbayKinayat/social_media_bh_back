import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Users } from 'src/users/users.model';
import { Langs } from './langs.model';

@Table({ tableName: "users_langs" })
export class UsersLangs extends Model<UsersLangs> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false })
  @ApiProperty({ example: "1", description: "Идентификатор" })
  id: number

  @ForeignKey(() => Users)
  @Column({ type: DataType.INTEGER, allowNull: false })
  @ApiProperty({ example: "1", description: "Идентификатор пользователя" })
  userId: number

  @ForeignKey(() => Langs)
  @Column({ type: DataType.INTEGER, allowNull: false })
  @ApiProperty({ example: "1", description: "Идентификатор языка" })
  langId: number
}