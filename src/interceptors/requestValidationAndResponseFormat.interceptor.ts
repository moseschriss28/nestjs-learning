import { NestInterceptor, ExecutionContext, CallHandler, BadRequestException } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';


export class RequestValidationAndResponseFormatInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const { body } = request;

        // Validate the request body
        if (!body || !body.username || !body.password) {
            throw new BadRequestException('Validation failed: username and password are required');
        }

        // Proceed with the handler and intercept the response
        return next.handle().pipe(
            map(data => {
                // Modify the response here
                return {
                    statusCode: context.switchToHttp().getResponse().statusCode,
                    timestamp: new Date().toISOString(),
                    data,
                };
            }),
        );
    }
}