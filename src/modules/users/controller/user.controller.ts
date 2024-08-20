import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { CreateUserUserCase } from '../useCase/create-user.useCase';
import { CreateUserSchemaDto } from '../schemas/create-user.schema';
import { CreateUserValidationPipe } from 'src/modules/users/pipe/create-user.validation.pipe';

@Controller('/users')
@UsePipes(new CreateUserValidationPipe())
export class UserController {
  constructor(private readonly userCase: CreateUserUserCase) {}
  @Post()
  async create(@Body() data: CreateUserSchemaDto) {
    return await this.userCase.execute(data);
  }
}
