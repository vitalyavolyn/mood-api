import { Controller, Get } from '@nestjs/common'
import { Public } from '../auth/auth.guard'

/**
 * Контроллер для проверки работоспособности сервера
 *
 * Просто возвращает статус 200 OK
 */
@Controller('health')
@Public()
export class HealthController {
  @Get()
  getOK() {
    return 'OK'
  }
}
