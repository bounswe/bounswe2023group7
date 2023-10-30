import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { ResetPasswordRepository } from '../repositories/reset-password.repository';
import { RegisterDto } from '../dtos/user/request/register.dto';
import { RegisterResponseDto } from '../dtos/user/response/register-response.dto';
import { LoginDto } from '../dtos/user/request/login.dto';
import { LoginResponseDto } from '../dtos/user/response/login-response.dto';
import { ResetDto } from '../dtos/user/request/reset.dto';
import { VerifyCodeDto } from '../dtos/user/request/verify-code.dto';
import { JwtService } from '@nestjs/jwt';
import { Payload } from '../interfaces/user/payload.interface';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly resetPasswordRepository: ResetPasswordRepository,
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

  public async sendCodeViaEmailForPasswordReset(email: string, code: string) {
    // send email
    /*
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
    */
  }

  public async resetPassword(input: ResetDto) {
    let user = await this.userRepository.findUserByEmail(input.email);

    if (!user) {
      throw new HttpException("No user found with this email", HttpStatus.FORBIDDEN);
    }

    let resetPassword = await this.resetPasswordRepository.findResetPasswordByEmail(input.email);

    if (resetPassword) {
      throw new HttpException("A password request is already in progress, check your mailbox", HttpStatus.FORBIDDEN);
    }

    //generate code
    let code = (Math.floor(Math.random() * 900000) + 100000).toString();

    // save to database
    await this.resetPasswordRepository.createPasswordReset(input, code, new Date());

    // send email
    await this.sendCodeViaEmailForPasswordReset(user.email, code);
  }

  public async verifyCode(input: VerifyCodeDto) {
    let resetPassword = await this.resetPasswordRepository.findResetPasswordByEmail(input.email);

    if (!resetPassword) {
      throw new HttpException("No password reset request found for this email", HttpStatus.FORBIDDEN);
    }

    let now = new Date();

    if ((now.getTime() - resetPassword.timestamp.getTime()) / 60000 < 15) {
      throw new HttpException("Time out (15min), try again", HttpStatus.FORBIDDEN);
    }

    if (resetPassword.code !== input.code) {
      throw new HttpException("Incorrect code", HttpStatus.FORBIDDEN);
    }

    // correct code, delete from database
    await this.resetPasswordRepository.deletePasswordReset(resetPassword);

    // set new password
    await this.userRepository.updateUserPassword(await this.userRepository.findUserByEmail(input.email), input.newPassword);
  }
}
