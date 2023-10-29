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
import { ResetDto } from '../dtos/reset-password/request/reset.dto'
import { ResetResponseDto } from '../dtos/reset-password/response/reset-response.dto'
import { VerifyCodeDto } from '../dtos/reset-password/request/verify-code.dto'
import { VerifyCodeResponseDto } from '../dtos/reset-password/response/verify-code-response.dto'
import { ResetPasswordService } from '../services/reset-password.service';

@ApiTags('reset-password')
@Controller('reset-password')
export class ResetPasswordController {
  constructor(private readonly resetPasswordService: ResetPasswordService) {}
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
    return await this.resetPasswordService.resetPassword(input);
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
    return await this.resetPasswordService.verifyCode(input);
  }
}