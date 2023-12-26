import {
  Controller,
  Delete,
  Param,
  Post,
  Body,
  Get,
  Put,
} from '@nestjs/common';

import { ApplicationsModel } from './entities/applications.entity';
import { ApplicationsService } from './applications.service';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  // Get ALl Application
  @Get()
  getApplications(): Promise<ApplicationsModel[]> {
    return this.applicationsService.getAllApplications();
  }

  // Get Application By Application ID
  @Get(':id')
  getApplication(@Param('id') applicationId: number) {
    return this.applicationsService.getApplicationById(applicationId);
  }

  // Create New Application
  @Post()
  postApplication(
    @Body('authorId') authorId: number,
    @Body('company') company: string,
    @Body('position') position: string,
    @Body('description') description: string,
    @Body('location') location?: string,
    @Body('salary') salary?: number,
  ): Promise<ApplicationsModel> {
    return this.applicationsService.createApplication(
      authorId,
      company,
      position,
      description,
      location,
      salary,
    );
  }

  // Update existing application
  @Put(':id')
  putApplication(
    @Param('id') applicationId: number,
    @Body('company') company?: string,
    @Body('position') position?: string,
    @Body('description') description?: string,
    @Body('location') location?: string,
    @Body('salary') salary?: number,
  ) {
    return this.applicationsService.updateApplication(
      applicationId,
      company,
      position,
      description,
      location,
      salary,
    );
  }

  // Remove application
  @Delete(':id')
  async deleteApplication(@Param('id') applicationId: number) {
    await this.applicationsService.deleteApplication(applicationId);

    return applicationId;
  }
}
