import { RegisterDto } from '../dtos/user/request/register.dto';
import { UserRepository } from '../repositories/user.repository';
import { RegisterResponseDto } from '../dtos/user/response/register-response.dto';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from '../dtos/user/request/login.dto';
import { LoginResponseDto } from '../dtos/user/response/login-response.dto';
import { JwtService } from '@nestjs/jwt';
import { Payload } from '../interfaces/user/payload.interface';
import { ChangePasswordDto } from 'dtos/user/request/change-password.dto';
import { User } from 'entities/user.entity';
import { ChangePasswordResponseDto } from 'dtos/user/response/change-password-response.dto';
@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async register(input: RegisterDto): Promise<RegisterResponseDto> {
    try {
      const user = await this.userRepository.createUser(input);
      const userResponseDto: RegisterResponseDto = {
        id: user.id,
        email: user.email,
        username: user.username,
      };
      return userResponseDto;
    } catch (e) {
      if (e.code == '23505') {
        throw new ConflictException(e.detail);
      }
      throw new InternalServerErrorException();
    }
  }
  public async login(input: LoginDto): Promise<LoginResponseDto> {
    const user = await this.userRepository.findUserByUsername(input.username);
    if (!(user && (await user.compareEncryptedPassword(input.password)))) {
      throw new UnauthorizedException('Invalid Credentials!');
    }
    const payload: Payload = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      accessToken,
    };
  }

  public async changePassword(changePasswordDto: ChangePasswordDto): Promise<ChangePasswordResponseDto> {
    const user: User = await this.userRepository.findUserById(changePasswordDto.userId);

    if (!user) {
      throw new NotFoundException('Kullanıcı bulunamadı!');
    }

    const isPasswordValid: boolean = await user.compareEncryptedPassword(changePasswordDto.oldPassword);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Eski şifre hatalı');
    }

    if (changePasswordDto.oldPassword === changePasswordDto.newPassword) {
      throw new BadRequestException('Eski şifre ve yeni şifre ayni olamaz!');
    }

    user.password = changePasswordDto.newPassword;
    await this.userRepository.save(user);
    return new ChangePasswordResponseDto(true) ;
  }

}
