import { BadRequestException, CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";


export class BodyValidationInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();

        const { body } = request;

        // Validate the request body
        if (!body || !body.username || !body.password) {
          throw new BadRequestException('Validation failed: username and password are required');
        }

        return next.handle()
    }
}