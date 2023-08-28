import { CurrentUser } from '@common/decorators/current-user.decorator';
import { UserEntity } from '@entities/user.entity';
import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PresignedUrlInput } from '../dtos/input/presigned-url.input';
import { FileService } from '../services/file.service';

@ApiTags('File')
@ApiBearerAuth()
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('/presigned-url/profile-image')
  createProfileImagePresignedUrl(
    @CurrentUser() user: UserEntity,
    @Body() presignedUrlInput: PresignedUrlInput
  ) {
    return this.fileService.createProfileImagePresignedUrl(
      user,
      presignedUrlInput
    );
  }

  @Post('/upload/profile-image')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @CurrentUser() user: UserEntity,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.fileService.uploadProfileImage(user, file);
  }
}
