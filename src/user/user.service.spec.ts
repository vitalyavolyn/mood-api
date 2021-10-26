import { Test, TestingModule } from '@nestjs/testing'
import { getModelToken } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ActivitiesService } from '../activities/activities.service'
import {
  Activity,
  ActivityDocument,
} from '../activities/schemas/activity.schema'
import { UserService } from './user.service'
import { User, UserDocument } from './schemas/user.schema'

// @ts-ignore: этого хватит
const mockUser = (id = 1, platform = 0): UserDocument => ({
  id,
  platform,

  populate() {
    return this
  },
})

describe('UserService', () => {
  let service: UserService
  let mockUserModel: Model<UserDocument>
  let mockActivityModel: Model<ActivityDocument>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(User.name),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn().mockResolvedValue(mockUser()),
          },
        },
        {
          provide: getModelToken(Activity.name),
          useValue: {
            insertMany: jest.fn(),
          },
        },
        UserService,
        ActivitiesService,
      ],
    }).compile()

    service = module.get<UserService>(UserService)
    mockUserModel = module.get<Model<UserDocument>>(getModelToken(User.name))
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

  describe('findOneOrCreate', () => {
    it('should create new user', async () => {
      const data = {
        id: 1,
        platform: 1,
      }

      const findSpy = jest
        .spyOn(mockUserModel, 'findOne')
        // @ts-ignore
        .mockReturnValue({ populate: () => Promise.resolve(null) })
      const activityInsertSpy = jest.spyOn(mockActivityModel, 'insertMany')

      const newUser = await service.findOneOrCreate(data.id, data.platform)

      expect(findSpy).toBeCalled()
      expect(newUser).toMatchObject(data)
      expect(activityInsertSpy).toBeCalled()
    })

    it('should return existing user', async () => {
      const mockData = mockUser()

      jest
        .spyOn(mockUserModel, 'findOne')
        // @ts-ignore
        .mockReturnValueOnce({ populate: () => Promise.resolve(mockData) })

      const createSpy = jest.spyOn(mockUserModel, 'create')

      const found = await service.findOneOrCreate(
        mockData.id,
        mockData.platform,
      )

      expect(createSpy).not.toBeCalled()
      expect(found).toMatchObject(mockData)
    })
  })
})
