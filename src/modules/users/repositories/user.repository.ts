import {
  UsernameAndEmail,
  CreateUserDto,
  UserCreateDto,
} from '../dto/user.dto';

export abstract class IUserRepository {
  abstract findByUsernameOrEmail(
    data: UsernameAndEmail,
  ): Promise<UserCreateDto | null>;

  abstract save(data: CreateUserDto): Promise<UserCreateDto | null>;
  abstract findByUsername(username: string): Promise<UserCreateDto | null>;
  abstract findById(id: string): Promise<UserCreateDto | null>;
}
