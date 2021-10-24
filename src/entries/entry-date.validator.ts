import { registerDecorator, ValidationOptions } from 'class-validator'
import { CreateEntryDto } from './dto/create-entry.dto'

/**
 * Валидатор для дат записей
 * Запись не может быть больше, чем на 24 часа в будущем
 */
export function IsTooEarly(validationOptions?: ValidationOptions) {
  return function (object: CreateEntryDto, propertyName: string) {
    registerDecorator({
      name: 'isTooEarly',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        ...validationOptions,
        message: `${propertyName} can't be that far in the future`,
      },
      validator: {
        validate(value: any) {
          const date = new Date(value)
          const now = new Date()
          const diff = (date.getTime() - now.getTime()) / (60 * 60 * 1000)

          return diff < 24
        },
      },
    })
  }
}
