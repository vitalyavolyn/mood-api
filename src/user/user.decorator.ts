import { URLSearchParams } from 'url'
import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Platform } from './schemas/user.schema'
import { FindUserParams, FindUserPipe } from './find-user.pipe'

export const GetUserSearchFilters = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): FindUserParams => {
    const request = ctx.switchToHttp().getRequest()
    const searchParams = new URLSearchParams(request.headers['x-vk-params'])

    return {
      platform:
        searchParams.get('vk_client') === 'ok' ? Platform.OK : Platform.VK,
      id: Number(searchParams.get('vk_user_id')),
    }
  },
)

export const InjectUser = (additionalOptions?: any) =>
  GetUserSearchFilters(additionalOptions, FindUserPipe)
