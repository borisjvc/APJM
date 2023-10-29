import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  Username: string;

  @IsNotEmpty()
  @IsString()
  Password: string;
}
