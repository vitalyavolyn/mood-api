import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common'
import { User } from '../user/user.decorator'
import { UserDocument } from '../user/schemas/user.schema'
import { ActivityIdParamDto } from './dto/activity-id-param.dto'
import { ActivitiesService } from './activities.service'
import { CreateUpdateActivityDto } from './dto/create-update-activity.dto'

@Controller('user/activities')
export class ActivitiesController {
  constructor(private activitiesService: ActivitiesService) {}

  @Post()
  async createActivity(
    @User() user: UserDocument,
    @Body() data: CreateUpdateActivityDto,
  ) {
    return this.activitiesService.createActivity(user, data)
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteActivity(
    @User() user: UserDocument,
    @Param() params: ActivityIdParamDto,
  ) {
    return this.activitiesService.deleteActivity(user, params.id)
  }

  @Post('/:id')
  async updateActivity(
    @User() user: UserDocument,
    @Param() params: ActivityIdParamDto,
    @Body() data: CreateUpdateActivityDto,
  ) {
    return this.activitiesService.updateActivity(user, params.id, data)
  }

  @Post('/:id/archive')
  async archiveActivity(
    @User() user: UserDocument,
    @Param() params: ActivityIdParamDto,
  ) {
    return this.activitiesService.setArchivedStatus(user, params.id, true)
  }

  @Post('/:id/unarchive')
  async unarchiveActivity(
    @User() user: UserDocument,
    @Param() params: ActivityIdParamDto,
  ) {
    return this.activitiesService.setArchivedStatus(user, params.id, false)
  }
}
