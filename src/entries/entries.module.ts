import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from '../user/user.module'
import { ActivitiesModule } from '../activities/activities.module'
import { Entry, EntrySchema } from './schemas/entry.schema'
import { EntriesService } from './entries.service'
import { EntriesController } from './entries.controller'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Entry.name, schema: EntrySchema }]),
    UserModule,
    ActivitiesModule,
  ],
  controllers: [EntriesController],
  providers: [EntriesService],
})
export class EntriesModule {}
