import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/user.dto';
import { CreateUserUserCase } from '../useCase/create-user.useCase';

@Controller('/users')
export class UserController {
  constructor(private readonly userCase: CreateUserUserCase) {}

  @Post()
  async create(@Body() data: CreateUserDto) {
    return await this.userCase.execute(data);
  }
}
