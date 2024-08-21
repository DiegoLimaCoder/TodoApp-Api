import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CreateUserUserCase } from '../useCase/create-user.useCase';
import { CreateUserValidationPipe } from 'src/modules/users/pipe/create-user.validation.pipe';
import { CreateUserDto } from '../dto/user.dto';
import { AuthGuard } from 'src/infra/providers/auth-guard.provider';
import { ProfileUserUserCase } from '../useCase/profile.user.usercase';

@Controller('/users')
@UsePipes(new CreateUserValidationPipe())
export class UserController {
  constructor(
    private readonly userCase: CreateUserUserCase,
    private profileUserUseCase: ProfileUserUserCase,
  ) {}
  @Post()
  async create(@Body() data: CreateUserDto) {
    return await this.userCase.execute(data);
  }

  @Get('/profile')
  @UseGuards(AuthGuard)
  async profile(@Request() req) {
    return this.profileUserUseCase.execute(req.user.sub);
  }
}
