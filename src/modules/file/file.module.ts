import awsConfig from '@config/aws.config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FileController } from './controllers/file.controller';
import { FileService } from './services/file.service';

@Module({
  imports: [ConfigModule.forFeature(awsConfig)],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
