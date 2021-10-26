import { Test, TestingModule } from '@nestjs/testing'
import { getModelToken } from '@nestjs/mongoose'
import { ActivitiesService } from '../activities/activities.service'
import { Activity } from '../activities/schemas/activity.schema'
import { UserService } from '../user/user.service'
import { User } from '../user/schemas/user.schema'
import { EntriesController } from './entries.controller'
import { EntriesService } from './entries.service'
import { Entry } from './schemas/entry.schema'

describe('EntriesController', () => {
  let controller: EntriesController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntriesController],
      providers: [
        {
          provide: getModelToken(Entry.name),
          useValue: {},
        },
        {
          provide: getModelToken(User.name),
          useValue: {},
        },
        {
          provide: getModelToken(Activity.name),
          useValue: {},
        },
        EntriesService,
        UserService,
        ActivitiesService,
      ],
    }).compile()

    controller = module.get<EntriesController>(EntriesController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
