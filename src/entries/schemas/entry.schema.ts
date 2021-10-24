import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { Document } from 'mongoose'
import { User } from '../../user/schemas/user.schema'
import { Activity } from '../../activities/schemas/activity.schema'

export type EntryDocument = Entry & Document

export enum Mood {
  Super,
  Good,
  Okay,
  Bad,
  Awful,
}

/**
 * Модель записи в днвнике
 */
@Schema()
export class Entry {
  /**
   * Настроение
   */
  @Prop({ required: true })
  mood: Mood

  /**
   * Заметка, текст записи в дневнике
   */
  @Prop({ default: '' })
  note: string

  /**
   * Дата записи
   *
   * Автоматические даты из mongoose не подойдут,
   * поскольку эту дату можно изменять в интерфейсе
   */
  @Prop({ required: true })
  date: Date

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  })
  owner: User

  /**
   * Занятия, связанные с записью
   */
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }] })
  activities: Activity[]
}

export const EntrySchema = SchemaFactory.createForClass(Entry)

EntrySchema.index({ note: 'text' })
