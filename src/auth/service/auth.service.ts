import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /// VALIDATE JWT TOKEN ///
  async validateToken(token: string): Promise<any> {
    try {
      const payload = this.jwtService.verify(token, { secret: this.configService.get<string>('JWT_SECRET') });
      return payload;
    } catch (error) {
      throw new HttpException('UnAuthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  /// VALIDATE THE USER IN THE DATABASE
  async validateUser(userName: string, userPassword: string): Promise<any> {
    // const user = { userId: 1, userName: 'test', userPassword: 'MOSES_PASSWORD', permissions: ['user:create', 'user:delete', 'user:read'] };
    const user = { userId: 1, userName: 'test', userPassword: '$2a$12$eIsWKc1/D1oq9occIGcuseTykPWsr1Q.evaIdYuVQAS/4i1BZUsw6', permissions: ['user:create', 'user:delete', 'user:read'] };

    const isPasswordMatching = await bcrypt.compare(userPassword, user.userPassword);
    if (user && isPasswordMatching) {
      const { userPassword, ...result } = user;
      return result;
    }
    return null;
  }

  /// CREATE JWT TOKEN 
  async login(userBody: any) {
    const user: any = await this.validateUser(userBody?.userName, userBody?.userPassword)
    if(!user) {
        throw new HttpException('Invalid email or password', HttpStatus.UNAUTHORIZED)
    }
    const payload = { username: user.userName, sub: user.userId, permissions: user.permissions };
    /// IT WILL VALIDATE THE DATA WITH THE DATABASE AND IT THE CREATE A TOKEN FOR THE LOGIN 
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
