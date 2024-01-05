export enum StatusEnum {
  APPLIED = 'applied',
  INTERVIEWED = 'interviewed',
  REJECTED = 'rejected',
  OFFER = 'offer',
  NOT_SELECTED = 'not_selected',
}

export interface ApplicationModel {
  company: string;
  position: string;
  description: string;
  location?: string | null;
  author: {
    id: number;
  };
  salary?: null | number;
  id: number;
  createdAt: Date;
  updatedAt: Date;
  status: StatusEnum;
}

export interface ApplicationsResponse {
  data: ApplicationModel[];
  isLast: boolean;
  nextCursor: number | null;
}

export interface CreateApplicationDto
  extends Pick<
    ApplicationModel,
    'company' | 'description' | 'position' | 'salary' | 'location'
  > {}

export interface UpdateApplicationDto extends CreateApplicationDto {
  id: number;
  status: StatusEnum;
}
