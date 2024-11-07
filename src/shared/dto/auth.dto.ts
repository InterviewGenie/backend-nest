export class AuthUserDto {
  email: string;
  password: string;
}

export class AuthPayload {
  _id: string | unknown;
  email: string;
  access_token: string;
}
