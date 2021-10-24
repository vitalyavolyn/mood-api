import { IsEnum, Length } from 'class-validator'
import { activityIcons } from '../data/activity-icons'

export class CreateUpdateActivityDto {
  @Length(1, 26)
  name: string

  @IsEnum(Object.values(activityIcons).flat())
  icon: string
}
