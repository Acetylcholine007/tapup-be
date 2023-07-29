import { CurrentUser } from '@common/decorators/current-user.decorator';
import { Public } from '@common/decorators/public.decorator';
import { LocalAuthGuard } from '@common/guards/local-auth.guard';
import { RefreshTokenGuard } from '@common/guards/refresh-token.guard';
import { UserEntity } from '@entities/user.entity';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RefreshTokenInput } from '../dto/input/refresh-token.input';
import { RegisterLocalInput } from '../dto/input/register-local.input';
import { SignInLocalInput } from '../dto/input/signin-local.input';
import { AuthService } from '../services/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('sign-in-local')
  async signInLocal(
    @CurrentUser() currentUser: UserEntity,
    @Body() _body: SignInLocalInput
  ) {
    return this.authService.signInLocal(currentUser);
  }

  @Public()
  @Post('register-local')
  signup(@Body() registerInput: RegisterLocalInput) {
    return this.authService.registerLocal(registerInput);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh-tokens')
  refreshTokens(
    @CurrentUser() currentUser: UserEntity,
    @Body() _refreshTokenInput: RefreshTokenInput
  ) {
    return this.authService.refreshTokens(currentUser);
  }
}
