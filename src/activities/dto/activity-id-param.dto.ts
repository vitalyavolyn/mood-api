import { IsMongoId } from 'class-validator'

export class ActivityIdParamDto {
  @IsMongoId()
  id: string
}
