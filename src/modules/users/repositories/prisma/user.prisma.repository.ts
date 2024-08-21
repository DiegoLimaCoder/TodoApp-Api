import { PrismaService } from 'src/infra/database/prisma.service';
import {
  UsernameAndEmail,
  UserCreateDto,
  CreateUserDto,
} from '../../dto/user.dto';
import { IUserRepository } from '../user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<UserCreateDto | null> {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findByUsername(username: string): Promise<UserCreateDto | null> {
    return await this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  async findByUsernameOrEmail(
    data: UsernameAndEmail,
  ): Promise<UserCreateDto | null> {
    return await this.prisma.user.findFirst({
      where: {
        OR: [{ username: data.username }, { email: data.email }],
      },
    });
  }

  async save(data: CreateUserDto): Promise<UserCreateDto | null> {
    return await this.prisma.user.create({ data });
  }
}
