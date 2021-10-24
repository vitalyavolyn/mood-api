import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model } from 'mongoose'
import { UserDocument } from '../user/schemas/user.schema'
import { ActivitiesService } from '../activities/activities.service'
import { Entry, EntryDocument } from './schemas/entry.schema'
import { CreateEntryDto } from './dto/create-entry.dto'
import { SearchEntriesDto } from './dto/search-entries.dto'

@Injectable()
export class EntriesService {
  constructor(
    @InjectModel(Entry.name) private entryModel: Model<EntryDocument>,
    private activitiesService: ActivitiesService,
  ) {}

  /**
   * Добавляет новую запись в дневник
   */
  async addEntry(user: UserDocument, data: CreateEntryDto): Promise<Entry> {
    if (data.activities.length) {
      // проверяем, точно ли занятия существуют и принадлежат ли пользователю
      const isValid = await this.activitiesService.verifyUserActivities(
        user,
        data.activities,
      )

      if (!isValid) throw new BadRequestException()
    }

    const entry = new this.entryModel({
      ...data,
      owner: user._id,
      _id: undefined,
    })
    await entry.save()
    return entry
  }

  async deleteEntry(user: UserDocument, id: string) {
    const entry = await this.entryModel.findOne({
      _id: id,
      owner: user._id,
    })

    if (!entry) {
      throw new NotFoundException()
    }

    await entry.delete()
  }

  async updateEntry(user: UserDocument, id: string, data: CreateEntryDto) {
    const entry = await this.entryModel.findOne({
      _id: id,
      owner: user._id,
    })

    if (!entry) {
      throw new NotFoundException()
    }

    Object.assign(entry, {
      ...data,
      owner: user._id,
      _id: entry._id,
    })

    await entry.save()
    return entry
  }

  async searchEntries(user: UserDocument, searchParams: SearchEntriesDto) {
    const conditions: FilterQuery<EntryDocument>[] = [{ owner: user._id }]

    if (searchParams.moods.length) {
      conditions.push({
        mood: { $in: searchParams.moods },
      })
    }

    if (searchParams.note) {
      conditions.push({
        $text: { $search: searchParams.note },
      })
    }

    if (searchParams.activities.length) {
      conditions.push({
        activities: { $all: searchParams.activities },
      })
    }

    return this.entryModel.find({ $and: conditions })
  }
}
