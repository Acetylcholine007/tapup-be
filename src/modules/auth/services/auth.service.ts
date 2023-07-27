import { UserEntity } from '@entities/user.entity';
import { CryptoService } from '@modules/crypto/services/crypto.service';
import { UserService } from '@modules/user/services/user.service';
import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/data/interfaces/auth.interface';
import { RegisterLocalInput } from '../dto/input/register-local.input';
import { TokenOutput } from '../dto/output/token.output';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly cryptoService: CryptoService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.getUser(email, 'email');

    if (user && (await this.cryptoService.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async signInLocal(user: UserEntity): Promise<TokenOutput> {
    const payload = { sub: user.id, email: user.email };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async registerLocal(registerInput: RegisterLocalInput): Promise<TokenOutput> {
    const existingUser = await this.userService.getUser(
      registerInput.email,
      'email'
    );

    if (existingUser) throw new ConflictException('Email already exists');

    const { password, ...userData } = registerInput;
    const hashedPassword = await this.cryptoService.hash(password);

    const user = await this.userService.createUser({
      ...userData,
      password: hashedPassword,
    });

    const payload: JwtPayload = { email: user.email, sub: user.id };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
