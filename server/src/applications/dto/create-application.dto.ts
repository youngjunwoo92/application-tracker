import { PickType } from '@nestjs/mapped-types';

import { ApplicationsModel } from '../entities/applications.entity';

export class CreateApplicationDto extends PickType(ApplicationsModel, [
  'company',
  'description',
  'location',
  'position',
  'salary',
]) {}
