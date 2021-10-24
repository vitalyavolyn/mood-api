import {
  IsDateString,
  IsInt,
  IsMongoId,
  Length,
  Max,
  Min,
} from 'class-validator'
import { Mood } from '../schemas/entry.schema'
import { IsTooEarly } from '../entry-date.validator'

export class CreateEntryDto {
  @IsInt()
  @Min(Mood.Super)
  @Max(Mood.Awful)
  mood: number

  @IsDateString()
  @IsTooEarly()
  date: string

  @Length(0, 9_000)
  note: string

  @IsMongoId({ each: true })
  activities: string[]
}
