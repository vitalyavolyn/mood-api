import { Type } from 'class-transformer'
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsHexColor,
  IsOptional,
  ValidateNested,
} from 'class-validator'
import { Settings } from '../schemas/user.schema'
import { themes } from '../../themes/data/themes'

class RemiderSettingsDto {
  @IsBoolean()
  enabled: boolean

  @IsEnum(['bot', 'push', ''])
  method: 'bot' | 'push' | ''

  @IsDateString()
  time?: Date
}

class CustomThemeDto {
  @ArrayMinSize(6)
  @ArrayMaxSize(6)
  @IsHexColor({ each: true })
  colors: string[]

  @IsBoolean()
  dark: boolean
}

export class UpdateSettingsDto implements Settings {
  @IsOptional()
  @ValidateNested()
  @Type(() => RemiderSettingsDto)
  reminders: RemiderSettingsDto

  @IsOptional()
  @IsEnum([...Object.keys(themes).map(Number), -1])
  theme: number

  @IsOptional()
  @ValidateNested()
  @Type(() => CustomThemeDto)
  customTheme: CustomThemeDto
}
