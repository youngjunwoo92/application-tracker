import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  Entity,
  OneToMany,
} from 'typeorm';

import { RolesEnum } from '../const/roles.const';
import { ApplicationsModel } from 'src/applications/entities/applications.entity';

@Entity()
export class UsersModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({
    enum: Object.values(RolesEnum),
    default: RolesEnum.USER,
  })
  role: RolesEnum;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => ApplicationsModel, (application) => application.author)
  applications: ApplicationsModel[];
}
