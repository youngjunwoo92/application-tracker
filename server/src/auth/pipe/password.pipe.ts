import {
  BadRequestException,
  ArgumentMetadata,
  PipeTransform,
  Injectable,
} from '@nestjs/common';
import { passwordRegex } from '../const/passwordRegex.const';

@Injectable()
export class PasswordPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!passwordRegex.test(value.toString())) {
      throw new BadRequestException(
        'Password must be 8 - 16 characters long with at least one number, at least one lowercase letter, at least one uppercase letter, and at least one special character.',
      );
    }
    return value.toString();
  }
}
