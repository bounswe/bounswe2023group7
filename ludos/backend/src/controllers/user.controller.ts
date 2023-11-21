import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
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
import { ResetDto } from '../dtos/user/request/reset.dto';
import { VerifyCodeDto } from '../dtos/user/request/verify-code.dto';
import { ChangePasswordResponseDto } from '../dtos/user/response/change-password-response.dto';
import { ChangePasswordDto } from '../dtos/user/request/change-password.dto';
import { EditUserInfoDto } from '../dtos/user/request/edit-info.dto';
import { UserService } from '../services/user.service';
import { AuthGuard } from '../services/guards/auth.guard';
import { AuthorizedRequest } from '../interfaces/common/authorized-request.interface';
import { GetUserInfoResponseDto } from '../dtos/user/response/get-user-info-response.dto';

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
    description: 'Successful Request for Resetting Password',
  })
  @ApiNotFoundResponse({
    description: 'No user found with this email',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @HttpCode(200)
  @ApiOperation({ summary: 'Password Reset Request Endpoint' })
  @Post('/reset-password')
  public async resetPassword(@Body() input: ResetDto) {
    await this.userService.resetPassword(input);
  }

  @ApiOkResponse({
    description: 'Set new password upon receiving the correct code',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @HttpCode(200)
  @ApiOperation({ summary: 'Password Reset Code Verification Endpoint' })
  @Post('/verify-code')
  public async verifyCode(@Body() input: VerifyCodeDto) {
    await this.userService.verifyCode(input);
  }

  @ApiOperation({ summary: 'Change Password Endpoint' })
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
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Put('/change-password')
  public async changePassword(
    @Req() req: AuthorizedRequest,
    @Body() input: ChangePasswordDto,
  ) {
    return await this.userService.changePassword(req.user.id, input);
  }

  @ApiOperation({ summary: 'Edit User Info Endpoint' })
  @ApiOkResponse({
    description: 'User information edited.',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid Credentials',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Put('/edit-info')
  public async editUserInfo(
    @Req() req: AuthorizedRequest,
    @Body() input: EditUserInfoDto,
  ) {
    await this.userService.editInfo(req.user.id, input);
  }

  @HttpCode(200)
  @ApiUnauthorizedResponse({
    description: 'Invalid User',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get User Info Request Endpoint' })
  @ApiOkResponse({
    type: GetUserInfoResponseDto,
  })
  @Get('/info')
  public async getUserInfoById(@Req() req: AuthorizedRequest) {
    return await this.userService.getUserInfo(req.user.id);
  }
}
