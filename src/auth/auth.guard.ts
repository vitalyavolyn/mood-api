import { IncomingMessage } from 'http'
import * as crypto from 'crypto'
import { URLSearchParams } from 'url'
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

export const Public = () => SetMetadata('isPublic', true)

function validateRequest(request: IncomingMessage) {
  const params = request.headers['x-vk-params'] as string

  const searchParams = new URLSearchParams(params)
  searchParams.sort()

  const sign = searchParams.get('sign')
  const secretKey = process.env.APP_SECRET_KEY

  for (const key of searchParams.keys()) {
    if (!key.startsWith('vk_')) {
      searchParams.delete(key)
    }
  }

  const hash = crypto
    .createHmac('sha256', secretKey)
    .update(searchParams.toString())
    .digest('base64url')

  return hash === sign
}

/**
 * Проверяет каждый запрос на валидность подписи параметров запуска VKMA
 *
 * Чтобы разрешить использовать роут без авторизации, используйте декоратор `@Public()`
 *
 * @see https://vk.com/dev/vk_apps_docs Документация ВК
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<IncomingMessage>()
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ])

    const allow = isPublic || validateRequest(request)

    if (!allow) {
      throw new UnauthorizedException()
    }

    return true
  }
}
