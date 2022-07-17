import { Tokens } from './tokens.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Sex } from 'src/sex/sex.model';
import { Avatars } from 'src/avatars/avatars.model';
import { Users } from './users.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([
      Sex,
      Avatars,
      Users,
      Tokens,
    ])
  ],
  exports: [
    UsersService
  ]
})
export class UsersModule { }
