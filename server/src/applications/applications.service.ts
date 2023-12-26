import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ApplicationsModel } from './entities/applications.entity';

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
    company: string,
    position: string,
    description: string,
    location?: string,
    salary?: number,
  ) {
    const application = this.applicationsRepository.create({
      author: {
        id: authorId,
      },
      company,
      position,
      description,
      location,
      salary,
    });

    const newPost = await this.applicationsRepository.save(application);
    return newPost;
  }

  async updateApplication(
    applicationId: number,
    company?: string,
    position?: string,
    description?: string,
    location?: string,
    salary?: number,
  ) {
    const application = await this.applicationsRepository.findOne({
      where: {
        id: applicationId,
      },
    });

    if (!application) throw new NotFoundException();

    const newApplication = await this.applicationsRepository.save({
      ...application,
      company: company || application.company,
      position: position || application.position,
      description: description || application.description,
      location: location || application.location,
      salary: salary || application.salary,
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
