import {
  CompleteMultipartUploadCommandOutput,
  S3Client,
} from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UploadResponseDto } from '../dtos/s3/response/upload-response.dto';

@Injectable()
export class S3Service {
  private s3: S3Client;
  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3Client({
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY'),
        secretAccessKey: this.configService.get<string>('AWS_SECRET_KEY'),
      },
      region: this.configService.get<string>('AWS_BUCKET_REGION'),
    });
  }

  public async uploadFile(
    file: Express.Multer.File,
  ): Promise<UploadResponseDto> {
    const uploadParams = {
      Bucket: this.configService.get<string>('AWS_BUCKET_NAME'),
      Body: file.buffer,
      Key: `${Date.now()}${file.originalname}`,
      ContentType: file.mimetype,
    };
    const d: CompleteMultipartUploadCommandOutput = await new Upload({
      client: this.s3,
      params: uploadParams,
    }).done();
    return {
      url: d.Location,
    };
  }
}
