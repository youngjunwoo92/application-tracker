import { Column, Entity, OneToMany } from 'typeorm';

import { ApplicationsModel } from 'src/applications/entities/applications.entity';
import { BaseModel } from 'src/common/entity/base.entity';

import { RolesEnum } from '../const/roles.const';
import { IsEmail, IsString, Length } from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity()
export class UsersModel extends BaseModel {
  @Column({
    unique: true,
  })
  @IsString()
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  username: string;

  @Column()
  @IsString()
  @Length(8, 16, { message: 'Password must be 8 - 16 chracters' })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({
    enum: Object.values(RolesEnum),
    default: RolesEnum.USER,
  })
  role: RolesEnum;

  @OneToMany(() => ApplicationsModel, (application) => application.author)
  applications: ApplicationsModel[];
}
