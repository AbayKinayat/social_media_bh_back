import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class RtStratagy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        let data = request?.cookies["refreshToken"];
        if (!data) {
          return null;
        }
        return data
      }]),
      secretOrKey: process.env.RT_SECRET_KEY,
      passReqToCallback: true,
    })
  }

  validate(req: Request, payload: any) {
    if (!payload) {
      throw new UnauthorizedException("Пользователь не авторизован");
    }
    console.log(Boolean(payload))
    return payload;
  }
}