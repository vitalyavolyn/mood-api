import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ActivitiesService } from '../activities/activities.service'
import { Platform, User, UserDocument } from './schemas/user.schema'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateSettingsDto } from './dto/update-settings.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private activitiesService: ActivitiesService,
  ) {}

  async findOne(id: number, platform: Platform): Promise<UserDocument | null> {
    return this.userModel
      .findOne({
        id,
        platform,
      })
      .populate('entries activities')
  }

  /**
   * Находит пользователя по id и платформе
   *
   * При отсуствии пользователя в базе создает нового
   */
  async findOneOrCreate(id: number, platform: Platform): Promise<UserDocument> {
    let user = await this.findOne(id, platform)

    if (!user) {
      user = await this.create({ id, platform })
    }

    return user
  }

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const user = await this.userModel.create(createUserDto)
    await this.activitiesService.createDefaultActivities(user)
    return user.populate('entries activities')
  }

  /**
   * @see StatsController
   */
  async getTotalCount(): Promise<number> {
    return this.userModel.estimatedDocumentCount()
  }

  async updateSettings(
    data: UpdateSettingsDto,
    user: UserDocument,
  ): Promise<boolean> {
    Object.assign(user.settings, data)
    await user.save()

    return true
  }
}
