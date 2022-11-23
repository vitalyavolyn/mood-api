import { Test, TestingModule } from '@nestjs/testing'
import { getModelToken } from '@nestjs/mongoose'
import { VkModule } from 'nestjs-vk'
import { ConfigModule } from '@nestjs/config'
import { UserService } from '../user/user.service'
import { User } from '../user/schemas/user.schema'
import { ActivitiesController } from './activities.controller'
import { ActivitiesService } from './activities.service'
import { Activity } from './schemas/activity.schema'

describe('ActivitiesController', () => {
  let controller: ActivitiesController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        VkModule.forRoot({
          token: '',
          launchOptions: false,
        }),
        ConfigModule.forRoot(),
      ],
      controllers: [ActivitiesController],
      providers: [
        {
          provide: getModelToken(Activity.name),
          useValue: {},
        },
        {
          provide: getModelToken(User.name),
          useValue: {},
        },
        ActivitiesService,
        UserService,
      ],
    }).compile()

    controller = module.get<ActivitiesController>(ActivitiesController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
