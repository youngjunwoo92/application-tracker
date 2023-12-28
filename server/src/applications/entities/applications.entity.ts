import {
  IsPositive,
  IsOptional,
  IsString,
  IsNumber,
  IsEnum,
  Length,
  Max,
} from 'class-validator';
import { ManyToOne, Column, Entity } from 'typeorm';

import { UsersModel } from 'src/users/entities/users.entity';
import { BaseModel } from 'src/common/entities/base.entity';

import { StatusEnum } from '../const/status.const';

@Entity()
export class ApplicationsModel extends BaseModel {
  @ManyToOne(() => UsersModel, (user) => user.applications, { nullable: false })
  author: UsersModel;

  @Column()
  @Length(1, 100)
  @IsString()
  company: string;

  @Column()
  @Length(1, 100)
  @IsString()
  position: string;

  @Column()
  @IsString()
  @Length(1, 5000)
  description: string;

  @Column({ nullable: true })
  @Length(1, 100)
  @IsString()
  location?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  @Max(1000000)
  @IsPositive()
  @IsNumber()
  @IsOptional()
  salary?: number;

  @Column({
    enum: StatusEnum,
    default: StatusEnum.APPLIED,
  })
  @IsEnum(StatusEnum)
  @IsString()
  @IsOptional()
  status: StatusEnum;
}
