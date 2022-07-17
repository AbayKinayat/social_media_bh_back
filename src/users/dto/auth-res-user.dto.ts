import { ApiProperty } from '@nestjs/swagger';
import { Users } from './../users.model';
export class AuthResDto {
  @ApiProperty({ example: "dasd23e3e2v.asdasd2e2e.csadwde3ed", description: "Токен для обновления" })
  refreshToken: string

  @ApiProperty({ example: "dasd23e3e2v.asdasd2e2e.csadwde3ed", description: "Токен для доступа" })
  accessToken: string

  @ApiProperty({ description: "Пользователь" })
  user: Users
}