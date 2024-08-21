import { Module } from '@nestjs/common';
import { CreateUserUserCase } from './useCase/create-user.useCase';
import { UserController } from './controller/user.controller';
import { PrismaService } from 'src/infra/database/prisma.service';
import { IUserRepository } from './repositories/user.repository';
import { UserPrismaRepository } from './repositories/prisma/user.prisma.repository';
import { ProfileUserUserCase } from './useCase/profile.user.usercase';

@Module({
  controllers: [UserController],
  providers: [
    CreateUserUserCase,
    PrismaService,
    ProfileUserUserCase,
    {
      provide: IUserRepository,
      useClass: UserPrismaRepository,
    },
  ],
})
export class UserModule {}
