import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';
import { ChangePasswordDto } from '../dtos/user/request/change-password.dto';
import { LoginDto } from '../dtos/user/request/login.dto';
import { RegisterDto } from '../dtos/user/request/register.dto';
import { ResetDto } from '../dtos/user/request/reset.dto';
import { VerifyCodeDto } from '../dtos/user/request/verify-code.dto';
import { ChangePasswordResponseDto } from '../dtos/user/response/change-password-response.dto';
import { LoginResponseDto } from '../dtos/user/response/login-response.dto';
import { RegisterResponseDto } from '../dtos/user/response/register-response.dto';
import { EditUserInfoDto } from '../dtos/user/request/edit-info.dto';
import { Payload } from '../interfaces/user/payload.interface';
import { ResetPasswordRepository } from '../repositories/reset-password.repository';
import { UserRepository } from '../repositories/user.repository';
import { GetUserInfoResponseDto } from '../dtos/user/response/get-user-info-response.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly resetPasswordRepository: ResetPasswordRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
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

  public async sendCodeViaEmailForPasswordReset(email: string, code: string) {
    const transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_SMTP'),
      secure: false,
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASS'),
      },
    });

    const mailOptions = {
      from: this.configService.get<string>('MAIL_USER'),
      to: email,
      subject: 'Verify Email',
      text: 'Verify Email',
      html: 'Hi! Here is your code to reset your password: ' + code,
    };

    await new Promise<boolean>(async function (resolve, reject) {
      return await transporter.sendMail(mailOptions, async (error: any) => {
        if (error) {
          //console.log('Message sent: %s', error);
          return reject(false);
        }
        //console.log('Message sent: %s', info.messageId);
        resolve(true);
      });
    });
  }

  public async resetPassword(input: ResetDto) {
    const user = await this.userRepository.findUserByEmail(input.email);

    if (!user) {
      throw new HttpException(
        'No user found with this email',
        HttpStatus.FORBIDDEN,
      );
    }

    const resetPassword =
      await this.resetPasswordRepository.findResetPasswordByEmail(input.email);

    if (resetPassword) {
      await this.resetPasswordRepository.deletePasswordReset(resetPassword);
      // throw new HttpException("A password request is already in progress, check your mailbox", HttpStatus.FORBIDDEN);
    }

    //generate code
    const code = (Math.floor(Math.random() * 900000) + 100000).toString();

    // save to database
    await this.resetPasswordRepository.createPasswordReset(
      input,
      code,
      new Date(),
    );

    // send email
    await this.sendCodeViaEmailForPasswordReset(user.email, code);
  }

  public async verifyCode(input: VerifyCodeDto) {
    const resetPassword =
      await this.resetPasswordRepository.findResetPasswordByEmail(input.email);

    if (!resetPassword) {
      throw new HttpException(
        'No password reset request found for this email',
        HttpStatus.FORBIDDEN,
      );
    }

    const now = new Date();

    if ((now.getTime() - resetPassword.timestamp.getTime()) / 60000 > 15) {
      await this.resetPasswordRepository.deletePasswordReset(resetPassword);
      throw new HttpException(
        'Time out (15min), try again',
        HttpStatus.FORBIDDEN,
      );
    }

    if (resetPassword.code !== input.code) {
      throw new HttpException('Incorrect code', HttpStatus.FORBIDDEN);
    }

    // correct code, delete from database
    await this.resetPasswordRepository.deletePasswordReset(resetPassword);

    // set new password
    await this.userRepository.updateUserPassword(
      await this.userRepository.findUserByEmail(input.email),
      input.newPassword,
    );
  }

  public async changePassword(
    userId: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<ChangePasswordResponseDto> {
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    if (!(await user.compareEncryptedPassword(changePasswordDto.oldPassword))) {
      throw new UnauthorizedException('Wrong Password!');
    }

    if (changePasswordDto.oldPassword == changePasswordDto.newPassword) {
      throw new BadRequestException('Old and new passwords can not be same!');
    }
    user.password = changePasswordDto.newPassword;
    await this.userRepository.save(user);
    return new ChangePasswordResponseDto(true);
  }

  public async editInfo(userId: string, editInfoDto: EditUserInfoDto) {
    const user = await this.userRepository.findUserById(userId);
    const updated = Object.assign(user, editInfoDto);
    delete updated.password;
    await this.userRepository.save(updated);
  }
  
  public async getUserInfo(userId: string): Promise<GetUserInfoResponseDto> {
    const user = await this.userRepository.findUserByIdWithRelations(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const response = new GetUserInfoResponseDto();
    response.email = user.email;
    response.username = user.username;
    response.followedGames = user.followedGames;

    return response;
  }
}
