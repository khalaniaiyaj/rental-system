export class UserDto {
  userName: string;
  email: string;
  password: string;
  isDeleted: boolean;
}

export class LoginDto {
  email: string;
  password: string;
}
