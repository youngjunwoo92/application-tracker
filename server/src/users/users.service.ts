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

  // Get all users
  async getAllUsers() {
    return this.usersRepository.find();
  }

  // Sign Up
  async createUser(email: string, password: string) {
    const emailExist = await this.usersRepository.exist({
      where: {
        email,
      },
    });

    if (emailExist) throw new BadRequestException('Email already in use');

    const username = email.split('@')[0];

    const user = this.usersRepository.create({
      email,
      username,
      password,
    });

    const newUser = await this.usersRepository.save(user);

    return newUser;
  }

  // Get user by email
  async getUserByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }
}
