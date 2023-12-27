import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ApplicationsModel } from './entities/applications.entity';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(ApplicationsModel)
    private readonly applicationsRepository: Repository<ApplicationsModel>,
  ) {}

  async getAllApplications() {
    return this.applicationsRepository.find({
      relations: ['author'],
    });
  }

  async getApplicationById(applicationId: number) {
    const application = this.applicationsRepository.findOne({
      where: { id: applicationId },
      relations: ['author'],
    });

    if (!application) throw new NotFoundException();

    return application;
  }

  async createApplication(
    authorId: number,
    applicationDto: CreateApplicationDto,
  ) {
    const application = this.applicationsRepository.create({
      ...applicationDto,
      author: {
        id: authorId,
      },
    });

    const newPost = await this.applicationsRepository.save(application);
    return newPost;
  }

  async updateApplication(
    applicationId: number,
    applicationDto: UpdateApplicationDto,
  ) {
    const application = await this.applicationsRepository.findOne({
      where: {
        id: applicationId,
      },
    });

    if (!application) throw new NotFoundException();

    const newApplication = await this.applicationsRepository.save({
      ...application,
      ...applicationDto,
    });

    return newApplication;
  }

  async deleteApplication(applicationId: number) {
    const application = await this.applicationsRepository.findOne({
      where: {
        id: applicationId,
      },
    });

    if (!application) throw new NotFoundException();

    await this.applicationsRepository.delete(applicationId);
    return applicationId;
  }
}
