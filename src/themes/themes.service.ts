import { Injectable } from '@nestjs/common'
import { themes } from './data/themes'

@Injectable()
export class ThemesService {
  getThemes() {
    return themes
  }
}
