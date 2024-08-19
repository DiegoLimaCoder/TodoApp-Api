import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { CreateUserDto } from '../dto/user.dto';

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
      throw new Error('User already Exist');
    }

    await this.prisma.user.create({ data });
  }
}
