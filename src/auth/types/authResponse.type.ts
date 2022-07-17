import { UserDto } from 'src/users/dto/user-dto';
export type AuthResponse = {
  accessToken: string,
  refreshToken: string,
  user: UserDto
}