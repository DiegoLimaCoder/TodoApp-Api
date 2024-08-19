import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { CreateUserDto } from '../dto/user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class CreateUserUserCase {
  constructor(private prisma: PrismaService) {}

  async execute(data: CreateUserDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ username: data.username }, { email: data.email }],
      },
    });

    if (user) {
      throw new HttpException('users already exist!', HttpStatus.BAD_REQUEST);
    }

    const password = await hash(data.password, 10);

    return await this.prisma.user.create({
      data: {
        ...data,
        password,
      },
    });
  }
}
