import { UserDto } from 'src/users/dto/user-dto';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class AtStratagy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.AT_SECRET_KEY
    })
  }

  validate(payload: UserDto) {
    return payload;
  }
}