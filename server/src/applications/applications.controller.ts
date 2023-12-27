import {
  ParseIntPipe,
  Controller,
  UseGuards,
  Delete,
  Param,
  Patch,
  Post,
  Body,
  Get,
  Query,
} from '@nestjs/common';

import { AccessTokenGuard } from 'src/auth/guard/bearerToken.guard';
import { ApplicationsModel } from './entities/applications.entity';
import { ApplicationsService } from './applications.service';
import { User } from 'src/users/decorator/user.decorator';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { PaginateApplicationDto } from './dto/pagenate-application.dto';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Get()
  getApplications(@Query() query: PaginateApplicationDto) {
    return this.applicationsService.paginateApplications(query);
    // return this.applicationsService.getAllApplications();
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

  @Post('random')
  async createRandomApplications() {
    return this.applicationsService.generateApplications(2);
  }
}
