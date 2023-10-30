import { Body, Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginDto } from '../dtos/user/request/login.dto';
import { RegisterDto } from '../dtos/user/request/register.dto';
import { LoginResponseDto } from '../dtos/user/response/login-response.dto';
import { RegisterResponseDto } from '../dtos/user/response/register-response.dto';
import { UserService } from '../services/user.service';
import { ChangePasswordResponseDto } from '../dtos/user/response/change-password-response.dto';
import { ChangePasswordDto } from '../dtos/user/request/change-password.dto';
import { AuthGuard } from '../services/guards/auth.guard';


@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @ApiOkResponse({
    description: 'Successful Register',
    type: RegisterResponseDto,
  })
  @ApiConflictResponse({
    description: 'Username or email conflict',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @HttpCode(200)
  @ApiOperation({ summary: 'Sign Up Endpoint' })
  @Post()
  public async register(@Body() input: RegisterDto) {
    return await this.userService.register(input);
  }
  @ApiOkResponse({
    description: 'Successful Login',
    type: LoginResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid Credentials',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @HttpCode(200)
  @ApiOperation({ summary: 'Login Endpoint' })
  @Post('/login')
  public async login(@Body() input: LoginDto) {
    return await this.userService.login(input);
  }
  
  @ApiOkResponse({
    description: 'Password change has been succesful!',
    type: ChangePasswordResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid Credentials',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @HttpCode(200)
  @ApiOperation({ summary: 'Change Password Endpoint' })
  @UseGuards(AuthGuard)
  @Post('/change-password')
  public async changePassword(@Req() req: any,@Body() input: ChangePasswordDto ) {
  
    return await this.userService.changePassword(req.user,input);
  }
}
