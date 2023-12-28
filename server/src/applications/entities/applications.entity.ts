import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ManyToOne, Column, Entity } from 'typeorm';

import { UsersModel } from 'src/users/entities/users.entity';
import { BaseModel } from 'src/common/entities/base.entity';

import { StatusEnum } from '../const/status.const';

@Entity()
export class ApplicationsModel extends BaseModel {
  @ManyToOne(() => UsersModel, (user) => user.applications, { nullable: false })
  author: UsersModel;

  @Column()
  @IsString()
  company: string;

  @Column()
  @IsString()
  position: string;

  @Column()
  @IsString()
  description: string;

  @Column({ nullable: true })
  @IsString()
  location?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  @IsNumber()
  salary?: number;

  @Column({
    enum: StatusEnum,
    default: StatusEnum.APPLIED,
  })
  @IsEnum(StatusEnum)
  @IsString()
  status: StatusEnum;
}
