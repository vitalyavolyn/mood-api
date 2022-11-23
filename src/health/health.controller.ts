import { Controller, Get } from '@nestjs/common'
import { Public } from '../auth/auth.guard'
import { UserService } from '../user/user.service'

/**
 * Контроллер для проверки работоспособности сервера
 *
 * Просто возвращает статус 200 OK
 */
@Controller('health')
@Public()
export class HealthController {
  constructor(private userService: UserService) {}

  @Get()
  async getOK() {
    await this.userService.getTotalCount()
    return 'OK'
  }
}
