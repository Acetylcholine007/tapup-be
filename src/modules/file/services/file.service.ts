import awsConfig from '@config/aws.config';
import { UserEntity } from '@entities/user.entity';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import * as mime from 'mime-types';
import { PresignedUrlInput } from '../dtos/input/presigned-url.input';
import { PresignedUrlOutput } from '../dtos/output/presigned-url.output';
import { UploadOutput } from '../dtos/output/upload.output';

@Injectable()
export class FileService {
  private readonly s3: S3;

  constructor(
    @Inject(awsConfig.KEY)
    private readonly awsConfiguration: ConfigType<typeof awsConfig>
  ) {
    this.s3 = new S3({
      accessKeyId: awsConfiguration.accessKeyId,
      secretAccessKey: awsConfiguration.secretAccessKey,
      region: awsConfiguration.s3Region,
      signatureVersion: 'v4',
    });
  }

  async uploadProfileImage(
    user: UserEntity,
    file: Express.Multer.File
  ): Promise<UploadOutput> {
    const objectKey = `public/user/profiles/${user.id}.${file.originalname
      .split('.')
      .at(-1)}`;

    console.log('>>>>>UPLOADING');
    const result = await this.s3Upload(file.buffer, objectKey, file.mimetype);

    console.log('>>>>>', result);
    return { fileUrl: result.Location };
  }

  async createProfileImagePresignedUrl(
    user: UserEntity,
    presignedUrlInput: PresignedUrlInput
  ): Promise<PresignedUrlOutput> {
    const objectKey = `public/user/profiles/${user.id}.${mime.extension(
      presignedUrlInput.mimeType
    )}`;

    const presignedUrl = await this.createPresignedUrl(objectKey);
    const objectUrl = this.getObjectUrl(objectKey);

    return {
      presignedUrl,
      objectUrl,
    };
  }

  async createPresignedUrl(key: string) {
    const params = {
      Bucket: this.awsConfiguration.s3Bucket,
      Key: key,
      Expires: this.awsConfiguration.s3PresignedUrlTtl,
    };

    return this.s3.getSignedUrlPromise('putObject', params);
  }

  getObjectUrl(key: string) {
    return `https://${this.awsConfiguration.s3Bucket}.s3.${this.awsConfiguration.s3Region}.amazonaws.com/${key}`;
  }

  async s3Upload(file: Buffer, key: string, mimetype: string) {
    const params: S3.PutObjectRequest = {
      Bucket: this.awsConfiguration.s3Bucket,
      Key: key,
      Body: file,
      ContentType: mimetype,
      ContentDisposition: 'inline',
    };

    return this.s3.upload(params).promise();
  }

  async s3Remove(key: string) {
    const params: S3.DeleteObjectRequest = {
      Bucket: this.awsConfiguration.s3Bucket,
      Key: key,
    };

    return this.s3.deleteObject(params).promise();
  }
}
