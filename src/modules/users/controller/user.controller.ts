import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { CreateUserUserCase } from '../useCase/create-user.useCase';
import { CreateUserValidationPipe } from 'src/modules/users/pipe/create-user.validation.pipe';
import { CreateUserDto } from '../dto/user.dto';

@Controller('/users')
@UsePipes(new CreateUserValidationPipe())
export class UserController {
  constructor(private readonly userCase: CreateUserUserCase) {}
  @Post()
  async create(@Body() data: CreateUserDto) {
    return await this.userCase.execute(data);
  }
}
