export type CreateUserDto = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export type UserCreateDto = {
  id: string;
  createAt: Date;
} & CreateUserDto;

export type UsernameAndEmail = {
  email: string;
  username: string;
};
