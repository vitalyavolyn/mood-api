import { Body, Controller, Get, Post } from '@nestjs/common'
import { UserService } from './user.service'
import { InjectUser } from './user.decorator'
import { Platform, UserDocument } from './schemas/user.schema'
import { UpdateSettingsDto } from './dto/update-settings.dto'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getCurrentUser(@InjectUser() user: UserDocument) {
    return {
      ...user.toObject(),
      isSubscribed:
        user.platform === Platform.OK
          ? false // не могу найти в документации ОК что-то похожее на groups.isMember
          : await this.userService.isVkUserSubscribed(user),
    }
  }

  @Post('/settings')
  async updateSettings(
    @Body() data: UpdateSettingsDto,
    @InjectUser() user: UserDocument,
  ) {
    return this.userService.updateSettings(data, user)
  }
}
