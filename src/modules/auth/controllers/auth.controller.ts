import { CurrentUser } from '@common/decorators/current-user.decorator';
import { Public } from '@common/decorators/public.decorator';
import { GoogleAuthGuard } from '@common/guards/google-auth.guard';
import { LocalAuthGuard } from '@common/guards/local-auth.guard';
import { RefreshTokenGuard } from '@common/guards/refresh-token.guard';
import { UserEntity } from '@entities/user.entity';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { OAuthStateInput } from '../dto/input/oauth-state.input';
import { RefreshTokenInput } from '../dto/input/refresh-token.input';
import { RegisterLocalInput } from '../dto/input/register-local.input';
import { SignInLocalInput } from '../dto/input/signin-local.input';
import { AuthService } from '../services/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {}

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('sign-in-google')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async signInGoogle() {}

  @Public()
  @Post('sign-in-google/url')
  async signInGoogleUrl(@Body() oAuthStateInput: OAuthStateInput) {
    return this.authService.signInGoogleUrl(oAuthStateInput);
  }

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('sign-in-google/callback')
  async signInGoogleCallback(
    @Req() req: Request,
    @CurrentUser() currentUser: UserEntity,
    @Res() res: Response
  ) {
    let newDestination: string;
    const state = req.query.state;
    if (state && typeof state === 'string') {
      const { destination } = JSON.parse(state);
      newDestination = destination;
    }

    const tokens = await this.authService.signIn(currentUser);
    return res
      .status(200)
      .cookie('accessToken', tokens.accessToken)
      .cookie('refreshToken', tokens.refreshToken)
      .redirect(
        newDestination ?? this.configService.get<string>('frontendUrl')
      );
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('sign-in-local')
  async signInLocal(
    @CurrentUser() currentUser: UserEntity,
    @Body() _body: SignInLocalInput
  ) {
    return this.authService.signIn(currentUser);
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
