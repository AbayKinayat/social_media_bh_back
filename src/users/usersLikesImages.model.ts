import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Users } from './users.model';
import { UsersImages } from './usersImages.model';

@Table({ tableName: "usersLikesImages" })
export class UsersLikesImages extends Model<UsersLikesImages> {

  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false })
  @ApiProperty({ example: "1", description: "Идентификатор", required: true })
  id: number

  @ApiProperty({ example: "1", description: "Идентификатор пользователя который лайкнул", required: true })
  @ForeignKey(() => Users)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number

  @ApiProperty({ example: "1", description: "Идентификатор изображения который лайкнули", required: true })
  @ForeignKey(() => UsersImages)
  @Column({ type: DataType.INTEGER, allowNull: false })
  imageId: number
}