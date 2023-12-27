import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateApplicationDto } from './create-application.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateApplicationDto extends PartialType(CreateApplicationDto) {
  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsString()
  position?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsNumber()
  salary?: number;
}
