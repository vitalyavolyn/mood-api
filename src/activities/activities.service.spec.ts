import { Test, TestingModule } from '@nestjs/testing'
import { getModelToken } from '@nestjs/mongoose'
import { ForbiddenException } from '@nestjs/common'
import { Model } from 'mongoose'
import { ActivitiesService } from './activities.service'
import { Activity, ActivityDocument } from './schemas/activity.schema'

describe('ActivitiesService', () => {
  let service: ActivitiesService
  let mockActivityModel: Model<ActivityDocument>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Activity.name),
          useValue: {
            findOne: jest.fn(),
          },
        },
        ActivitiesService,
      ],
    }).compile()

    service = module.get<ActivitiesService>(ActivitiesService)
    mockActivityModel = module.get<Model<ActivityDocument>>(
      getModelToken(Activity.name),
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('getUserActivity', () => {
    it("should throw when trying to get someone else's activity", async () => {
      jest.spyOn(mockActivityModel, 'findOne').mockResolvedValueOnce(null)

      await expect(() =>
        // @ts-ignore
        service.getUserActivity({ _id: '1' }, ''),
      ).rejects.toThrow(ForbiddenException)
    })
  })

  it('should return activity when owner and user ids match', async () => {
    const activity = {
      owner: '1',
    }

    // @ts-ignore (достаточно для проверки правильности)
    jest.spyOn(mockActivityModel, 'findOne').mockResolvedValueOnce(activity)

    return (
      service
        // @ts-ignore
        .getUserActivity({ _id: '1' }, '')
        .then((received) => expect(received).toMatchObject(activity))
    )
  })
})
