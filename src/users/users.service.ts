import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sex } from 'src/sex/sex.model';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './users.model';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(Users) private userRepository: typeof Users,
    @InjectModel(Sex) private sexRepository: typeof Sex
  ) { }

  async createUser(userDto: CreateUserDto): Promise<Users> {
    const user = await this.userRepository.create(userDto, {
      include: [
        {
          model: this.sexRepository,
          as: "sex"
        }
      ]
    });
    return user;
  }

  async getUserByEmail(email: string): Promise<Users> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async getUsers(): Promise<Users[]> {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

}
