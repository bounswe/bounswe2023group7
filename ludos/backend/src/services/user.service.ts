import { RegisterDto } from '../dtos/user/request/register.dto';
import { UserRepository } from '../repositories/user.repository';
import { RegisterResponseDto } from '../dtos/user/response/register-response.dto';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto } from '../dtos/user/request/login.dto';
import { LoginResponseDto } from '../dtos/user/response/login-response.dto';
import { JwtService } from '@nestjs/jwt';
import { Payload } from '../interfaces/user/payload.interface';
import { ResetDto } from 'dtos/user/request/reset.dto';
import { ResetResponseDto } from 'dtos/user/response/reset-response.dto';
import { VerifyCodeResponseDto } from 'dtos/user/response/verify-code-response.dto';
import { VerifyCodeDto } from 'dtos/user/request/verify-code.dto';
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

  public async sendCodeViaEmailForPasswordReset(email: string, code: string): Promise<Date> {
    // send the code via email and return sending time
    return new Date();
  }

  public async resetPassword(input: ResetDto): Promise<ResetResponseDto> {
    const user = await this.userRepository.findUserByEmail(input.email);
    if (!user) {
      throw new NotFoundException('No user found with this email');
    }
    let code = (Math.floor(Math.random() * 900000) + 100000).toString();
    let timestamp = await this.sendCodeViaEmailForPasswordReset(user.email, code);
    // save to database
    return {
      username: user.username,
    };
  }

  public async verifyCode(input: VerifyCodeDto): Promise<VerifyCodeResponseDto> {
    // check timestamp
    // verify code
    return {
      correctCode: true,
    };
  }
}
