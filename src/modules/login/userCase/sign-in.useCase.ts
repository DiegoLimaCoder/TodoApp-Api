import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from '../dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/infra/database/prisma.service';
import { compare } from 'bcrypt';

@Injectable()
export class SignInUseCase {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}
  async execute(data: SignInDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        username: data.username,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const password = await compare(data.password, user.password);

    if (!password) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };
    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
    };
  }
}
