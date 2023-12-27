import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersModel } from './entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersModel)
    private readonly usersRepository: Repository<UsersModel>,
  ) {}

  async getAllUsers() {
    return this.usersRepository.find();
  }

  async getUserById(id: number) {
    return this.usersRepository.findOne({ where: { id } });
  }

  async getUserByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

  // Sign Up
  async createUser(email: string, hashedPassword: string) {
    const found = await this.getUserByEmail(email);

    if (found) throw new BadRequestException('Email already in use');

    const username = email.split('@')[0];

    const user = this.usersRepository.create({
      email,
      username,
      password: hashedPassword,
    });

    const newUser = await this.usersRepository.save(user);

    return newUser;
  }
}
