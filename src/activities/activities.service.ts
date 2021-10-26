import { ForbiddenException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UserDocument } from '../user/schemas/user.schema'
import { Activity, ActivityDocument } from './schemas/activity.schema'
import { defaultActivities } from './data/default-activities'
import { CreateUpdateActivityDto } from './dto/create-update-activity.dto'

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectModel(Activity.name) private activityModel: Model<ActivityDocument>,
  ) {}

  async createActivity(user: UserDocument, data: CreateUpdateActivityDto) {
    return await this.activityModel.create({
      text: data.name,
      icon: data.icon,
      owner: user,
    })
  }

  /**
   * Проверяет, существуют ли у пользователя данные занятия
   */
  async verifyUserActivities(user: UserDocument, ids: string[]) {
    const activities = await this.activityModel.find({
      _id: { $in: ids },
      owner: user,
    })
    return activities.length === ids.length
  }

  /**
   * Получает занятие пользователя
   * Если занятие принадлежит кому-то другому или не существует,
   * выбрасывает ошибку
   */
  private async getUserActivity(
    user: UserDocument,
    id: string,
  ): Promise<ActivityDocument> {
    const activity = await this.activityModel.findOne({ _id: id, owner: user })

    if (!activity) {
      throw new ForbiddenException()
    }

    return activity
  }

  async createDefaultActivities(user: UserDocument) {
    return this.activityModel.insertMany(
      defaultActivities.map((e) => ({ ...e, owner: user })),
    )
  }

  async deleteActivity(user: UserDocument, id: string) {
    const activity = await this.getUserActivity(user, id)
    await activity.delete()
    // TODO: удалять из записей?
  }

  async setArchivedStatus(user: UserDocument, id: string, isArchived: boolean) {
    const activity = await this.getUserActivity(user, id)
    activity.archived = isArchived
    await activity.save()
  }

  async updateActivity(
    user: UserDocument,
    id: string,
    data: CreateUpdateActivityDto,
  ) {
    const activity = await this.getUserActivity(user, id)
    activity.text = data.name
    activity.icon = data.icon
    return activity.save()
  }
}
