import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from '../dto/sign-in.dto';
import { SignInUseCase } from '../userCase/sign-in.useCase';

@Controller()
export class LoginController {
  constructor(private readonly signInUseCase: SignInUseCase) {}
  @Post('/sign-in')
  async sigIn(@Body() data: SignInDto) {
    const token = await this.signInUseCase.execute(data);
    return token;
  }
}
