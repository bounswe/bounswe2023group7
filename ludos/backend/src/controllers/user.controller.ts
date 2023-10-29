import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { LoginDto } from '../dtos/user/request/login.dto';
import { RegisterDto } from '../dtos/user/request/register.dto';
import { LoginResponseDto } from '../dtos/user/response/login-response.dto';
import { RegisterResponseDto } from '../dtos/user/response/register-response.dto';
import { ResetDto } from '../dtos/reset-password/request/reset.dto'
import { ResetResponseDto } from '../dtos/reset-password/response/reset-response.dto'
import { VerifyCodeDto } from '../dtos/reset-password/request/verify-code.dto'
import { VerifyCodeResponseDto } from '../dtos/reset-password/response/verify-code-response.dto'
import { UserService } from '../services/user.service';

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
  @ApiOperation({summary: "Sign Up Endpoint"})
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
  @ApiOperation({summary: "Login Endpoint"})
  @Post('/login')
  public async login(@Body() input: LoginDto) {
    return await this.userService.login(input);
  }
  @ApiOkResponse({
    description: 'Successful Request for Resetting Password',
    type: ResetResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'No user found with this email',
  })
  @HttpCode(200)
  @ApiOperation({summary: "Password Reset Request Endpoint"})
  @Post('/reset-password')
  public async resetPassword(@Body() input: ResetDto) {
    return await this.userService.resetPassword(input);
  }
  @ApiOkResponse({
    description: 'Set new password upon receiving the correct code',
    type: VerifyCodeResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @HttpCode(200)
  @ApiOperation({summary: "Password Reset Code Verification Endpoint"})
  @Post('/verify-code')
  public async verifyCode(@Body() input: VerifyCodeDto) {
    return await this.userService.verifyCode(input);
  }
}
