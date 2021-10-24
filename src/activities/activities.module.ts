import { forwardRef, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from '../user/user.module'
import { ActivitiesController } from './activities.controller'
import { ActivitiesService } from './activities.service'
import { Activity, ActivitySchema } from './schemas/activity.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Activity.name, schema: ActivitySchema },
    ]),
    forwardRef(() => UserModule),
  ],
  controllers: [ActivitiesController],
  providers: [ActivitiesService],
  exports: [ActivitiesService],
})
export class ActivitiesModule {}
