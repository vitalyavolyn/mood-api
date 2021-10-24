import { Platform } from '../schemas/user.schema'

export class CreateUserDto {
  id: number
  platform: Platform
}
