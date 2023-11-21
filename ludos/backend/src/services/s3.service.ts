import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { createReadStream } from 'fs';
import { UploadResponseDto } from '../dtos/s3/response/upload-response.dto';

@Injectable()
export class S3Service {
  constructor(private readonly configService: ConfigService) {}

  public initializeS3(): S3 {
    const s3 = new S3({
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY'),
        secretAccessKey: this.configService.get<string>('AWS_SECRET_KEY'),
      },
      region: this.configService.get<string>('AWS_BUCKET_REGION'),
    });
    return s3;
  }

  public async uploadFile(
    file: Express.Multer.File,
  ): Promise<UploadResponseDto> {
    const s3 = this.initializeS3();
    const stream = createReadStream(file.path);
    const uploadParams = {
      Bucket: this.configService.get<string>('AWS_BUCKET_NAME'),
      Body: stream,
      Key: file.filename,
    };
    const d = await new Upload({
      client: s3,
      params: uploadParams,
    }).done();
    if ('Location' in d) {
      return {
        url: d.Location,
      };
    }
    return;
  }
}
