import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/user.dto';
import { hash } from 'bcrypt';
import { IUserRepository } from '../repositories/user.repository';

@Injectable()
export class CreateUserUserCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: CreateUserDto) {
    const user = await this.userRepository.findByUsernameOrEmail(data);

    if (user) {
      throw new HttpException('users already exist!', HttpStatus.BAD_REQUEST);
    }

    const password = await hash(data.password, 10);

    return await this.userRepository.save({
      ...data,
      password,
    });
  }
}
