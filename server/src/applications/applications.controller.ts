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
  UseInterceptors,
} from '@nestjs/common';

import { ApplicationsModel } from './entities/applications.entity';
import { ApplicationsService } from './applications.service';
import { User } from 'src/users/decorator/user.decorator';

import { IsApplicationMineOrAdmin } from './guard/is-application-mine-or-admin.guard';
import { PaginateApplicationDto } from './dto/pagenate-application.dto';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { LogInterceptor } from 'src/common/interceptor/log.interceptor';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  // GET: /applications
  @Get()
  async getApplications(
    @User('id') userId: number,
    @Query() query: PaginateApplicationDto,
  ) {
    return await this.applicationsService.getApplicationsWithFilter(
      userId,
      query,
    );
  }

  // GET: /applications/:id
  @Get(':applicationId')
  @UseInterceptors(LogInterceptor)
  @UseGuards(IsApplicationMineOrAdmin)
  async getApplicationById(
    @Param('applicationId', ParseIntPipe) applicationId: number,
  ) {
    return await this.applicationsService.getApplicationById(applicationId);
  }

  // POST: /applications
  @Post()
  async createApplication(
    @User('id') userId: number,
    @Body() body: CreateApplicationDto,
  ): Promise<ApplicationsModel> {
    return await this.applicationsService.createApplication(userId, body);
  }

  // PATCH: /applications/:id
  @Patch(':applicationId')
  @UseGuards(IsApplicationMineOrAdmin)
  async updateApplication(
    @Param('applicationId', ParseIntPipe) applicationId: number,
    @Body() body: UpdateApplicationDto,
  ) {
    return await this.applicationsService.updateApplication(
      applicationId,
      body,
    );
  }

  // DELETE: /applications/:id
  @Delete(':applicationId')
  @UseGuards(IsApplicationMineOrAdmin)
  async deleteApplication(
    @Param('applicationId', ParseIntPipe) applicationId: number,
  ) {
    return await this.applicationsService.deleteApplication(applicationId);
  }
}

// @Post('random')
// async createRandomApplications() {
//   return this.applicationsService.generateApplications(2);
// }
