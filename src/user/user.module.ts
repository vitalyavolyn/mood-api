import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ActivitiesModule } from '../activities/activities.module'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { User, UserSchema } from './schemas/user.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ActivitiesModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
