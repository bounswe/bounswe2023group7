import {
  Controller,
  HttpCode,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { S3Service } from '../services/s3.service';
import { AuthGuard } from '../services/guards/auth.guard';
import { AuthorizedRequest } from '../interfaces/common/authorized-request.interface';
import { UploadResponseDto } from '../dtos/s3/response/upload-response.dto';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors';
import { diskStorage } from 'multer';

@ApiTags('external')
@Controller('external')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @ApiOkResponse({
    description: 'File uploaded',
    type: UploadResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Endpoint for uploading a file' })
  @Post('/upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
      }),
    })
  )
  public async uploadFile(
    @Req() _req: AuthorizedRequest,
    @UploadedFile('file') file: Express.Multer.File,
  ) {
    return await this.s3Service.uploadFile(file);
  }
}