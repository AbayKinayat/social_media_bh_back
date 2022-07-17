import { RtStratagy } from './strategies/rt.strategy';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Users } from 'src/users/users.model';
import { Tokens } from 'src/users/tokens.model';
import { UsersModule } from 'src/users/users.module';
import { AtStratagy } from './strategies';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    JwtModule.register({}),
    SequelizeModule.forFeature([Users, Tokens]),
    UsersModule,
    AtStratagy,
    RtStratagy,
  ]
})
export class AuthModule { }
