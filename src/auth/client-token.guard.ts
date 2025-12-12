import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class ClientTokenGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();

    const token =
      req.headers['client_id_token'] ||
      req.headers['client-id-token'];

    if (!token || token !== process.env.CLIENT_TOKEN) {
      throw new UnauthorizedException('Invalid client token');
    }

    return true;
  }
}
