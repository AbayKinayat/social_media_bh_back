import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { AuthUserDto } from 'src/users/dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthResDto } from 'src/users/dto/auth-res-user.dto';

@ApiTags("Авторизация")
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) { }

  @Post('local/login')
  @ApiOperation({ summary: "Войти", description: "Есть валидация данных. Проверяет пароли. Генерирует токена. Хранит токен в базе" })
  @ApiResponse({ status: 200, type: AuthResDto })
  async localLogin(@Body() userDto: AuthUserDto, @Res() res: Response) {
    console.log(userDto)
    const userData = await this.authService.localLogin(userDto);
    res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: false });

    res.status(200).json(userData);
  }

  @Post('local/registration')
  @ApiOperation({ summary: "Регистрация", description: "Есть валидация данных. Генерирует токена. Хэширует пароль и создает пользователя. Хранит токен в базе" })
  @ApiResponse({ status: 201, type: AuthResDto })
  async localRegistration(@Body() userDto: CreateUserDto, @Res() res: Response) {
    console.log(userDto)
    const userData = await this.authService.localRegistration(userDto);
    res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

    res.status(201).json(userData);
  }

  @Post('logout')
  @ApiOperation({ summary: "Выйти", description: "Удаляет с базы токен и очищает куки." })
  @ApiResponse({ status: 200 })
  async logout(@Req() req: Request, @Res() res: Response) {
    const { refreshToken } = req.cookies;
    const tokenData = await this.authService.logout(refreshToken);

    res.clearCookie("refreshToken");

    return res.json(tokenData);
  }

  @Post('refresh')
  @ApiOperation({ summary: "Обновить токен и получить пользователя", description: "Есть проверка токена. В базе обновляет токен и также в куки" })
  @ApiResponse({ status: 200, type: AuthResDto })
  @UseGuards(AuthGuard('jwt-refresh'))
  async refresh(@Res() res: Response, @Req() req: Request) {
    const { refreshToken } = req.cookies;
    console.log("refreshToken", refreshToken)
    const userData = await this.authService.refresh(refreshToken);
    res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

    return res.json(userData);
  }

}
