import { IsIn, IsNumber, IsOptional } from 'class-validator';
import { StatusEnum } from '../const/status.const';

export class PaginateApplicationDto {
  @IsNumber()
  @IsOptional()
  cursor?: number;

  @IsIn(['ASC', 'DESC'])
  @IsOptional()
  order?: 'ASC' | 'DESC' = 'ASC';

  @IsNumber()
  @IsOptional()
  limit?: number = 20;

  @IsIn(Object.values(StatusEnum))
  @IsOptional()
  status?: StatusEnum;
}
