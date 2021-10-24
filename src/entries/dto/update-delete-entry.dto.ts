import { IsMongoId } from 'class-validator'

export class UpdateDeleteEntryDto {
  @IsMongoId()
  id: string
}
