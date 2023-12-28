import { FindOptionsWhere, LessThan, MoreThan, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { PaginateApplicationDto } from './dto/pagenate-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { CreateApplicationDto } from './dto/create-application.dto';
import { ApplicationsModel } from './entities/applications.entity';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(ApplicationsModel)
    private readonly applicationsRepository: Repository<ApplicationsModel>,
  ) {}

  // async generateApplications(userId: number) {
  //   for (let i = 0; i < 100; i++) {
  //     await this.createApplication(userId, {
  //       company: `Company ${i}`,
  //       position: `Position ${i}`,
  //       description: `Description ${i}`,
  //     });
  //   }
  // }

  async getAllApplications() {
    return this.applicationsRepository.find({
      relations: ['author'],
    });
  }

  async getApplicationsWithFilter(userId: number, dto: PaginateApplicationDto) {
    const where: FindOptionsWhere<ApplicationsModel> = {};
    const { cursor, order, status, limit } = dto;

    if (cursor != null) {
      where.id = order === 'ASC' ? MoreThan(cursor) : LessThan(cursor);
    }

    if (status) {
      where.status = status;
    }

    const applications = await this.applicationsRepository.find({
      where: { ...where, author: { id: userId } },
      order: {
        createdAt: order,
      },
      take: limit,
      relations: {
        author: true,
      },
    });

    const isLast = applications.length !== limit;
    const nextCursor = isLast ? null : applications[applications.length - 1].id;

    return { data: applications, isLast, nextCursor };
  }

  async getApplicationById(applicationId: number) {
    const application = await this.applicationsRepository.findOne({
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

    const newApplication = await this.applicationsRepository.save(application);
    return newApplication;
  }

  async updateApplication(
    applicationId: number,
    applicationDto: UpdateApplicationDto,
  ) {
    const application = await this.applicationsRepository.findOne({
      where: { id: applicationId },
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

  async isApplicationMine(userId: number, applicationId: number) {
    return await this.applicationsRepository.exist({
      where: {
        id: applicationId,
        author: {
          id: userId,
        },
      },
      relations: {
        author: true,
      },
    });
  }
}
