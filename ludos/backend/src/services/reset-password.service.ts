import { UserRepository } from '../repositories/user.repository';
import { PasswordResetRepository } from '../repositories/reset-password.repository';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload } from '../interfaces/user/payload.interface';
import { ResetDto } from 'dtos/reset-password/request/reset.dto';
import { ResetResponseDto } from 'dtos/reset-password/response/reset-response.dto';
import { VerifyCodeResponseDto } from 'dtos/reset-password/response/verify-code-response.dto';
import { VerifyCodeDto } from 'dtos/reset-password/request/verify-code.dto';
import * as nodemailer from 'nodemailer';

const mail_config = {
  "mail":{
    "host": "<smtp-host>",
    "port": "<port>",
    "secure": false,
    "user": "<username>",
    "pass": "<password>"
  },
  "host": {
    "url": "<server-url>",
    "port": "3000"
  },
}

@Injectable()
export class ResetPasswordService {
  constructor(
    private readonly resetPasswordRepository: PasswordResetRepository,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async sendCodeViaEmailForPasswordReset(email: string, code: string): Promise<Date> {
    let transporter = nodemailer.createTransport({
      host: mail_config.mail.host,
      port: mail_config.mail.port,
      secure: mail_config.mail.secure, // true for 465, false for other ports
      auth: {
        user: mail_config.mail.user,
        pass: mail_config.mail.pass
      }
    });

    let mailOptions = {
      from: '"Company" <' + mail_config.mail.user + '>', 
      to: email, // list of receivers (separated by ,)
      subject: 'Verify Email', 
      text: 'Verify Email', 
      html: 'Hi! <br><br> Thanks for your registration<br><br>'+
      '<a href='+ mail_config.host.url + ':' + mail_config.host.port +'/auth/email/verify/'+ code + '>Click here to activate your account</a>'  // html body
    };

    let sent = await new Promise<boolean>(async function(resolve, reject) {
      return await transporter.sendMail(mailOptions, async (error: any, info: any) => {
        if (error) {      
          console.log('Message sent: %s', error);
          return reject(false);
        }
        console.log('Message sent: %s', info.messageId);
        resolve(true);
      });      
    })

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
    // await this.resetPasswordRepository.deletePasswordReset();
    return {
      correctCode: true,
    };
  }
}
