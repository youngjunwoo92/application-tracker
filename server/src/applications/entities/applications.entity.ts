import { UsersModel } from 'src/users/entities/users.entity';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
  Entity,
} from 'typeorm';
import { StatusEnum } from '../const/status.const';

@Entity()
export class ApplicationsModel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UsersModel, (user) => user.applications, { nullable: false })
  author: UsersModel;

  @Column()
  company: string;

  @Column()
  position: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  location: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  salary: number;

  @Column({
    enum: Object.values(StatusEnum),
    default: StatusEnum.APPLIED,
  })
  status: StatusEnum;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
