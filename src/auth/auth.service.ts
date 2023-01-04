import { UsersService } from './../users/users.service';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/users/dto/user-dto';
import { AuthResponse } from './types';
import { InjectModel } from '@nestjs/sequelize';
import { Tokens } from 'src/users/tokens.model';
import { Users } from 'src/users/users.model';
import { AuthUserDto } from 'src/users/dto/login-user.dto';

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel(Tokens) private tokensRepository: typeof Tokens
  ) { }

  async localLogin(authUserDto: AuthUserDto): Promise<AuthResponse> {
    const user = await this.usersService.getUserByEmail(authUserDto.email);
    if (!user) {
      throw new HttpException("Не верный email или пароль", HttpStatus.BAD_REQUEST);
    }

    const equalPassword = await bcrypt.compare(authUserDto.password, user.password);

    if (!equalPassword) {
      throw new HttpException("Не верный email или пароль", HttpStatus.BAD_REQUEST);
    }

    const userData = new UserDto(user);

    const { accessToken, refreshToken } = await this.generateTokens({ ...userData });

    await this.saveToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
      user: userData
    }
  }

  async localRegistration(createUserDto: CreateUserDto): Promise<AuthResponse> {
    const candidateEmail = await this.usersService.getUserByEmail(createUserDto.email);
    if (candidateEmail) {
      throw new HttpException(`Пользователь с таким ${createUserDto.email} уже существует`, HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await this.hashData(createUserDto.password);

    const user = await this.usersService.createUser({ ...createUserDto, password: hashPassword });

    const userData = new UserDto(user);

    const { accessToken, refreshToken } = await this.generateTokens({ ...userData });

    await this.saveToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
      user: userData
    }
  }

  async logout(refreshToken: string): Promise<Tokens> {
    const tokenData = await this.tokensRepository.findOne({ where: { refreshToken } });
    await tokenData.destroy();
    return tokenData;
  }

  async refresh(refreshToken: string): Promise<AuthResponse> {
    if (!refreshToken) {
      throw new UnauthorizedException("Пользователь не авторизован");
    }

    const userData = this.validateRefreshToken(refreshToken);
    const tokenFromDb = await this.tokensRepository.findOne({ where: { refreshToken } });
    console.log("tokenFromDb", tokenFromDb)
    if (!tokenFromDb || !userData) {
      throw new UnauthorizedException("Пользователь не авторизован");
    }

    const user = await this.usersService.getUserByEmail(userData.email);

    const userFromDto = new UserDto(user);
    const { refreshToken: rt, accessToken } = await this.generateTokens({ ...userFromDto });

    await this.saveToken(userFromDto.id, rt);

    return {
      accessToken,
      refreshToken: rt,
      user: userFromDto
    }
  }

  async hashData(data: string): Promise<string> {
    const hash = await bcrypt.hash(data, 10);
    return hash;
  }

  async generateTokens(payload: UserDto): Promise<any> {
    try {
      const accessToken = await this.jwtService.signAsync(payload, {
        secret: process.env.AT_SECRET_KEY,
        expiresIn: "30m"
      });
      const refreshToken = await this.jwtService.signAsync(payload, {
        secret: process.env.RT_SECRET_KEY,
        expiresIn: "30d"
      });

      return {
        accessToken, refreshToken
      }
    } catch (e) {
      console.log(e)
      return null;
    }
  }

  async saveToken(userId: number, refreshToken: string) {
    console.log("userId", userId);
    const tokenData = await this.tokensRepository.findOne({ where: { userId } });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    } else {
      const token = await this.tokensRepository.create({ userId, refreshToken });
      return token;
    }
  }

  validateRefreshToken(refreshToken: string): Users | null {
    try {
      const data = this.jwtService.verify(refreshToken, {
        secret: process.env.RT_SECRET_KEY
      });

      return data;
    } catch (e) {
      return null;
    }
  }
}
