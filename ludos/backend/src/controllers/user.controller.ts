import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginDto } from '../dtos/user/request/login.dto';
import { RegisterDto } from '../dtos/user/request/register.dto';
import { LoginResponseDto } from '../dtos/user/response/login-response.dto';
import { RegisterResponseDto } from '../dtos/user/response/register-response.dto';
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
  @Post('/login')
  public async login(@Body() input: LoginDto) {
    return await this.userService.login(input);
  }
}
