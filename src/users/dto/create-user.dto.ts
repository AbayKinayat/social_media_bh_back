import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, isNotEmpty, IsNumber, IsString, Length } from "class-validator"

export class CreateUserDto {

  @ApiProperty({ example: "example@example.com", description: "Электронная почта" })
  @IsString({ message: "Email должен быть строкой" })
  @IsEmail({}, { message: "Не корректный email" })
  readonly email: string

  @ApiProperty({ example: "Иван", description: "Имя пользователя" })
  @IsString({ message: "Имя должно быть строкой" })
  readonly firstName: string

  @ApiProperty({ example: "Иванов", description: "Фамлиия пользователя" })
  @IsString({ message: "Фамилмя должно быть строкой" })
  readonly lastName: string

  @ApiProperty({ example: "1", description: "Идентификато пола" })
  readonly sexId: number

  @ApiProperty({ example: "qwerty1234", description: "Пароль" })
  @IsString({ message: "Пароль должен быть строкой" })
  @Length(8, 16, { message: "Пароль должен быть минимум 8 символов и миксимим 16 символов" })
  readonly password: string
}