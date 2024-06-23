import { BadRequestException, PipeTransform, ArgumentMetadata } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";



export class RequestValidationWithPipes implements PipeTransform {
    async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
        if (!metatype || !this.toValidate(metatype)) {
          return value;
        }
        /// value is the actual request value and metatype is the type of the value passed
        const object = plainToClass(metatype, value);
        const errors = await validate(object);
        if (errors.length > 0) {
          throw new BadRequestException('Validation failed');
        }
        return value;
      }
    
      private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return types.includes(metatype);
      }
}