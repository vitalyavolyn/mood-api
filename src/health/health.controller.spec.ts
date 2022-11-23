import { Test, TestingModule } from '@nestjs/testing'
import { getModelToken } from '@nestjs/mongoose'
import { VkModule } from 'nestjs-vk'
import { ConfigModule } from '@nestjs/config'
import { User } from '../user/schemas/user.schema'
import { ActivitiesService } from '../activities/activities.service'
import { UserService } from '../user/user.service'
import { Activity } from '../activities/schemas/activity.schema'
import { HealthController } from './health.controller'

describe('HealthController', () => {
  let controller: HealthController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        VkModule.forRoot({
          token: '',
          launchOptions: false,
        }),
        ConfigModule.forRoot(),
      ],
      controllers: [HealthController],
      providers: [
        {
          provide: getModelToken(User.name),
          useValue: {
            estimatedDocumentCount: jest.fn(),
          },
        },
        {
          provide: getModelToken(Activity.name),
          useValue: {},
        },
        UserService,
        ActivitiesService,
      ],
    }).compile()

    controller = module.get<HealthController>(HealthController)
  })

  it('should return 200 OK', async () => {
    const response = await controller.getOK()
    expect(response).toBe('OK')
  })
})
