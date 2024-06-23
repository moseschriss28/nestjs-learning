import { BadRequestException, CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";


export class ResponseObjectFormatInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        /// INTERCEPTOR THAT FORMAT THE RESPONSE OBJECT BODY AND SEND THE RESPONSE TO THE FRONT END
        return next.handle().pipe(
            map(data => {
              return {
                statusCode: context.switchToHttp().getResponse().statusCode,
                timestamp: new Date().toISOString(),
                data,
              };
            }),
          );
    }
}