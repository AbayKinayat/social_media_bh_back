import { UserDto } from 'src/users/dto/user-dto';
import { createParamDecorator, type ExecutionContext } from "@nestjs/common";

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserDto | null => {
    const request = ctx.switchToHttp().getRequest();

    if (!request.user) {
      return null;
    }

    return request.user;
  }
);