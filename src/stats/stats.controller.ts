import { Controller, Get } from '@nestjs/common'
import { Public } from '../auth/auth.guard'
import { UserService } from '../user/user.service'

/**
 * Контроллер для публичной статистики
 *
 * Пока что просто возвращает (примерное) количество пользователей
 */
@Controller('stats')
@Public()
export class StatsController {
  constructor(private userService: UserService) {}

  @Get()
  async getStats() {
    return {
      users: await this.userService.getTotalCount(),
    }
  }
}
