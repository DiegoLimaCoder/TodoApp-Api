import { Module } from '@nestjs/common';
import { LoginController } from './controller/login.controller';
import { SignInUseCase } from './userCase/sign-in.useCase';
import { PrismaService } from 'src/infra/database/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'App_Todo',
      signOptions: { expiresIn: '60d' },
    }),
  ],
  controllers: [LoginController],
  providers: [SignInUseCase, PrismaService],
})
export class LoginModule {}
