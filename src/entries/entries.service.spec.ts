import { Test, TestingModule } from '@nestjs/testing'
import { getModelToken } from '@nestjs/mongoose'
import { VkModule } from 'nestjs-vk'
import { ConfigModule } from '@nestjs/config'
import { ActivitiesService } from '../activities/activities.service'
import { Activity } from '../activities/schemas/activity.schema'
import { EntriesService } from './entries.service'
import { Entry } from './schemas/entry.schema'

describe('EntriesService', () => {
  let service: EntriesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        VkModule.forRoot({
          token: '',
          launchOptions: false,
        }),
        ConfigModule.forRoot(),
      ],
      providers: [
        {
          provide: getModelToken(Entry.name),
          useValue: {},
        },
        {
          provide: getModelToken(Activity.name),
          useValue: {},
        },
        EntriesService,
        ActivitiesService,
      ],
    }).compile()

    service = module.get<EntriesService>(EntriesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
