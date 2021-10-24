import { Injectable, PipeTransform } from '@nestjs/common'
import { UserService } from './user.service'
import { Platform } from './schemas/user.schema'

export type FindUserParams = {
  platform: Platform
  id: number
}

@Injectable()
export class FindUserPipe implements PipeTransform {
  constructor(private userService: UserService) {}

  async transform(value: FindUserParams) {
    const { id, platform } = value
    return this.userService.findOneOrCreate(id, platform)
  }
}
