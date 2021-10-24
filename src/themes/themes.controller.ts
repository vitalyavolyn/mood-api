import { Controller, Get } from '@nestjs/common'
import { ThemesService } from './themes.service'

@Controller('themes')
export class ThemesController {
  constructor(private themesService: ThemesService) {}

  @Get()
  async getThemes() {
    return this.themesService.getThemes()
  }
}
