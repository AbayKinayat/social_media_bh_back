import { UsersService } from './users.service';
import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Users } from './users.model';
@ApiTags("Пользователи")
@Controller('users')
export class UsersController {

  constructor(
    private usersService: UsersService
  ) { }

  @Get()
  @ApiOperation({ summary: "Получить пользователей" })
  @ApiResponse({ status: 200, type: [Users] })
  async getUsers() {
    return this.usersService.getUsers();
  }
}
