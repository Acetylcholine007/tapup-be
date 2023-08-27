export interface AccessTokenPayload {
  sub: string;
  email: string;
}

export interface RefreshTokenPayload {
  sub: string;
  refresh: true;
}

export interface VerifyTokenPayload {
  sub: string;
  email: string;
  verify: true;
  destination: string;
}
