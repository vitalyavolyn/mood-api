import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common'
import { InjectUser } from '../user/user.decorator'
import { UserDocument } from '../user/schemas/user.schema'
import { ActivityIdParamDto } from './dto/activity-id-param.dto'
import { ActivitiesService } from './activities.service'
import { CreateUpdateActivityDto } from './dto/create-update-activity.dto'

@Controller('user/activities')
export class ActivitiesController {
  constructor(private activitiesService: ActivitiesService) {}

  @Post()
  async createActivity(
    @InjectUser() user: UserDocument,
    @Body() data: CreateUpdateActivityDto,
  ) {
    return this.activitiesService.createActivity(user, data)
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteActivity(
    @InjectUser() user: UserDocument,
    @Param() params: ActivityIdParamDto,
  ) {
    return this.activitiesService.deleteActivity(user, params.id)
  }

  @Post('/:id')
  async updateActivity(
    @InjectUser() user: UserDocument,
    @Param() params: ActivityIdParamDto,
    @Body() data: CreateUpdateActivityDto,
  ) {
    return this.activitiesService.updateActivity(user, params.id, data)
  }

  @Post('/:id/archive')
  async archiveActivity(
    @InjectUser() user: UserDocument,
    @Param() params: ActivityIdParamDto,
  ) {
    return this.activitiesService.setArchivedStatus(user, params.id, true)
  }

  @Post('/:id/unarchive')
  async unarchiveActivity(
    @InjectUser() user: UserDocument,
    @Param() params: ActivityIdParamDto,
  ) {
    return this.activitiesService.setArchivedStatus(user, params.id, false)
  }
}
