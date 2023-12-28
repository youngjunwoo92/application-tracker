import { IsEmail, IsString, Matches } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';

import { ApplicationsModel } from 'src/applications/entities/applications.entity';
import { PASSWORD_REGEX } from '../const/password-regex.const';
import { BaseModel } from 'src/common/entities/base.entity';
import { RolesEnum } from '../const/roles.const';

@Entity()
export class UsersModel extends BaseModel {
  @Column({
    unique: true,
  })
  @IsEmail()
  @IsString()
  email: string;

  @Column()
  @IsString()
  username: string;

  @Column()
  @IsString()
  @Matches(PASSWORD_REGEX, {
    message:
      'Password must be between 8 and 16 characters and include a number, lowercase letter, uppercase letter, and a special character.',
  })
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
