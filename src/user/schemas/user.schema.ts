import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { Entry } from '../../entries/schemas/entry.schema'
import { Activity } from '../../activities/schemas/activity.schema'

export type UserDocument = User & Document

export enum Platform {
  VK,
  OK,
}

export interface Settings {
  reminders: {
    enabled: boolean
    method: 'bot' | 'push' | ''
    time?: Date
  }
  theme: number
  customTheme: {
    colors: string[]
    dark: boolean
  }
}

const settingsSchema = {
  reminders: {
    enabled: { type: Boolean, default: false, index: true },
    method: { type: String, enum: ['bot', 'push', ''], default: '' },
    time: { type: Date, index: true },
  },
  theme: { type: Number, default: 0 },
  customTheme: {
    colors: {
      type: [String],
      // 5 настроений, акцентный цвет
      default: [
        '#eea060',
        '#d24e5b',
        '#a32c92',
        '#7947b8',
        '#698fce',
        '#eea060',
      ],
    },
    dark: Boolean,
  },
}

@Schema()
export class User {
  /**
   * ID пользователя внутри платформы (ВК/ОК)
   */
  @Prop({ required: true })
  id: number

  /**
   * Платформа, на которой зарегистрирован пользователь
   */
  @Prop({ required: true })
  platform: Platform

  entries: Entry[]

  @Prop(raw(settingsSchema))
  settings: Settings

  activities: Activity[]
}

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.virtual('entries', {
  ref: 'Entry',
  localField: '_id',
  foreignField: 'owner',
})

UserSchema.virtual('activities', {
  ref: 'Activity',
  localField: '_id',
  foreignField: 'owner',
})

UserSchema.set('toObject', { virtuals: true })
UserSchema.set('toJSON', { virtuals: true })

UserSchema.index({ id: 1, platform: 1 }, { unique: true })
