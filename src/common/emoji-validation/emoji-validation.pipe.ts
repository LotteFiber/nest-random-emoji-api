import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class EmojiValidationPipe implements PipeTransform {
  transform(value: any) {
    if (value === undefined || value === null || value === '') {
      return undefined;
    }

    const num = Number(value);
    if (isNaN(num)) {
      throw new BadRequestException(
        `Validation failed: ${num} is not a number`,
      );
    }
    if (num < 0 || num > 9) {
      throw new BadRequestException(
        `Validation failed: ${num} is not within the range`,
      );
    }

    console.log(`Pipe: validation passed`);
    return num;
  }
}
