import { Test, TestingModule } from '@nestjs/testing'
import { getModelToken } from '@nestjs/mongoose'
import { Activity } from '../activities/schemas/activity.schema'
import { ActivitiesService } from '../activities/activities.service'
import { UserController } from './user.controller'
import { User } from './schemas/user.schema'
import { UserService } from './user.service'

describe('UserController', () => {
  let controller: UserController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: getModelToken(User.name),
          useValue: {},
        },
        {
          provide: getModelToken(Activity.name),
          useValue: {},
        },
        UserService,
        ActivitiesService,
      ],
    }).compile()

    controller = module.get<UserController>(UserController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
