import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, isNotEmpty, IsNumber, IsString, Length } from "class-validator"

export class AuthUserDto {

  @ApiProperty({ example: "example@example.com", description: "Электронная почта" })
  @IsString({ message: "Email должен быть строкой" })
  @IsEmail({}, { message: "Не корректный email" })
  readonly email: string

  @ApiProperty({ example: "qwerty1234", description: "Пароль" })
  @IsString({ message: "Пароль должен быть строкой" })
  @Length(8, 16, { message: "Пароль должен быть минимум 8 символов и миксимим 16 символов" })
  readonly password: string
}