import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { Document } from 'mongoose'
import { User } from '../../user/schemas/user.schema'
import { activityIcons } from '../data/activity-icons'

export type ActivityDocument = Activity & Document

/**
 * Модель занятий, которые можно крепить к записи в дневнике
 */
@Schema()
export class Activity {
  /**
   * Название занятия
   */
  @Prop({
    lowercase: true,
    maxlength: 26,
    minlength: 1,
    trim: true,
  })
  text: string

  /**
   * Название иконки занятия (из ограниченного количества)
   */
  @Prop({
    enum: Object.values(activityIcons).flat(),
  })
  icon: string

  /**
   * После архивации занятие больше нельзя вешать на новые записи,
   * оно не отбражается в окне создания, но остается в старых записях
   */
  @Prop({ default: false })
  archived: boolean

  /**
   * Владелец занятия
   */
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  })
  owner: User
}

export const ActivitySchema = SchemaFactory.createForClass(Activity)
