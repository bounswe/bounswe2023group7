import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { S3 } from 'aws-sdk';

@Injectable()
export class S3Service {
  constructor(
    private readonly jwtService: JwtService,
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

  public async uploadPhoto(file: File): Promise<S3.ManagedUpload.SendData> {
    let s3 = this.initializeS3();
    let fileStream = file;
    let uploadParams = {
      Bucket: this.configService.get<string>('AWS_BUCKET_NAME'),
      Body: fileStream,
      Key: file.name,
    }
    return s3.upload(uploadParams).promise();
  }

  public async downloadPhoto(fileKey: string) {
    let downloadParams = {
      Bucket: this.configService.get<string>('AWS_BUCKET_NAME'),
      Key: fileKey,
    }
  }
}
