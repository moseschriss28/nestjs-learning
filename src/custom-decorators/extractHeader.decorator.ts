import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/// EXTRACT ANY DATA DATA FROM HEADER LIKE USER DETAILS ///
export const ExtractDataFromHeader = createParamDecorator(
    (data: string, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        return data ? request.headers[data] : null;
    }
)