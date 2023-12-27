import {
  ParseIntPipe,
  Controller,
  UseGuards,
  Delete,
  Param,
  Post,
  Body,
  Get,
  Put,
  Patch,
} from '@nestjs/common';

import { AccessTokenGuard } from 'src/auth/guard/bearerToken.guard';
import { ApplicationsModel } from './entities/applications.entity';
import { ApplicationsService } from './applications.service';
import { User } from 'src/users/decorator/user.decorator';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

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
  getApplication(@Param('id', ParseIntPipe) applicationId: number) {
    return this.applicationsService.getApplicationById(applicationId);
  }

  // Create New Application
  @Post()
  @UseGuards(AccessTokenGuard)
  postApplication(
    @User('id') userId: number,
    @Body() body: CreateApplicationDto,
  ): Promise<ApplicationsModel> {
    return this.applicationsService.createApplication(userId, body);
  }

  // Update existing application
  @Patch(':id')
  patchApplication(
    @Param('id', ParseIntPipe) applicationId: number,
    @Body() body: UpdateApplicationDto,
  ) {
    return this.applicationsService.updateApplication(applicationId, body);
  }

  // Remove application
  @Delete(':id')
  async deleteApplication(@Param('id', ParseIntPipe) applicationId: number) {
    await this.applicationsService.deleteApplication(applicationId);

    return applicationId;
  }
}
