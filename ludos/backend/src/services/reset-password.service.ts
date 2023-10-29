import { RegisterDto } from '../dtos/user/request/register.dto';
import { UserRepository } from '../repositories/user.repository';
import { PasswordResetRepository } from '../repositories/reset-password.repository';
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
import { ResetDto } from 'dtos/reset-password/request/reset.dto';
import { ResetResponseDto } from 'dtos/reset-password/response/reset-response.dto';
import { VerifyCodeResponseDto } from 'dtos/reset-password/response/verify-code-response.dto';
import { VerifyCodeDto } from 'dtos/reset-password/request/verify-code.dto';

@Injectable()
export class ResetPasswordService {
  constructor(
    private readonly resetPasswordRepository: PasswordResetRepository,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async sendCodeViaEmailForPasswordReset(email: string, code: string): Promise<Date> {
    // send the code via email and return sending time
    return new Date();
  }

  public async resetPassword(input: ResetDto): Promise<ResetResponseDto> {
    let user = await this.userRepository.findUserByEmail(input.email);
    if (!user) {
      throw new NotFoundException('No user found with this email');
    }
    let code = (Math.floor(Math.random() * 900000) + 100000).toString();
    let timestamp = await this.sendCodeViaEmailForPasswordReset(user.email, code);
    // save to database
    await this.resetPasswordRepository.createPasswordReset(input);
    return {
      username: user.username,
    };
  }

  public async verifyCode(input: VerifyCodeDto): Promise<VerifyCodeResponseDto> {
    // check timestamp
    // verify code
    await this.resetPasswordRepository.deletePasswordReset();
    return {
      correctCode: true,
    };
  }
}
