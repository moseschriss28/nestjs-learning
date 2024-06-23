// parse-body.pipe.ts
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class requestParseBodyPipe implements PipeTransform<any> {
  transform(value: any) {
    // Implement your custom parsing logic here
    try {
      const parsedValue = JSON.parse(value);
      return parsedValue;
    } catch (error) {
      throw new BadRequestException('Invalid JSON format');
    }
  }
}
