import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { LoggerService } from '../../logger.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly logger: LoggerService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    this.logger.info('Guard: Checking authentication');
    const request = context.switchToHttp().getRequest();
    // const apiKey = request.header('x-api-key');
    const apiKey = request.headers['x-api-key'];
    if (apiKey !== 'SECRET') {
      this.logger.info(`Guard: failed authentication`);
      return false;
    }
    this.logger.info(`Guard: passed authentication`);
    return true;
  }
}
