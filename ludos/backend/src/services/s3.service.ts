import {
  Injectable, StreamableFile,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { createReadStream } from 'fs';
import { UploadResponseDto } from '../dtos/s3/response/upload-response.dto';

@Injectable()
export class S3Service {
  constructor(
    private readonly configService: ConfigService,
  ) {}

  public initializeS3(): S3 {
    let s3 = new S3({
      region: this.configService.get<string>('AWS_BUCKET_REGION'),
      accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY'),
      secretAccessKey: this.configService.get<string>('AWS_SECRET_KEY'),
    });
    return s3;
  }

  public async uploadFile(file: Express.Multer.File): Promise<S3.ManagedUpload.SendData> {
    let s3 = this.initializeS3();
    let uploadParams = {
      Bucket: this.configService.get<string>('AWS_BUCKET_NAME'),
      Body: createReadStream(file.path),
      Key: file.filename,
    }
    return s3.upload(uploadParams).promise();
  }

  public async uploadFileAndGetUrl(file: Express.Multer.File): Promise<UploadResponseDto> {
    return {
      url: ((await this.uploadFile(file)).Location)
    };
  }

  public async downloadFile(fileKey: string): Promise<StreamableFile> {
    let s3 = this.initializeS3();
    let downloadParams = {
      Bucket: this.configService.get<string>('AWS_BUCKET_NAME'),
      Key: fileKey,
    }
    let a = s3.getObject(downloadParams).createReadStream();
    return new StreamableFile(a);
  }
}
