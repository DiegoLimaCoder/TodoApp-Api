import { Module } from '@nestjs/common';
import { CreateUserUserCase } from './useCase/create-user.useCase';
import { UserController } from './controller/user.controller';
import { PrismaService } from 'src/infra/database/prisma.service';

@Module({
  controllers: [UserController],
  providers: [CreateUserUserCase, PrismaService],
})
export class UserModule {}
