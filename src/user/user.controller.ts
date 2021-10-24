import { Body, Controller, Get, Post } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from './user.decorator'
import { UserDocument } from './schemas/user.schema'
import { UpdateSettingsDto } from './dto/update-settings.dto'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getCurrentUser(@User() user: UserDocument) {
    return user
  }

  @Post('/settings')
  async updateSettings(
    @Body() data: UpdateSettingsDto,
    @User() user: UserDocument,
  ) {
    return this.userService.updateSettings(data, user)
  }
}
