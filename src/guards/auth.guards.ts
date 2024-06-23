import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { AuthService } from '../auth/service/auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService ) {}

  private extractTokenFromHeader(request: any): string | null {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return null;
    }
    const [, token] = authHeader.split(' ');
    return token;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const authToken = this.extractTokenFromHeader(request);

    const decodedToken = await this.authService.validateToken(authToken);
    if (!decodedToken) {
        return false;
    }

    request.user = decodedToken;
    return true;
  }
}
