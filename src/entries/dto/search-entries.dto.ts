import { IsInt, IsMongoId, Length, Max, Min } from 'class-validator'
import { Mood } from '../schemas/entry.schema'

export class SearchEntriesDto {
  @Length(0, 500)
  note: string

  @IsInt({ each: true })
  @Min(Mood.Super, { each: true })
  @Max(Mood.Awful, { each: true })
  moods: Mood[]

  @IsMongoId({ each: true })
  activities: string[]
}
