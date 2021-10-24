import { Test, TestingModule } from '@nestjs/testing'
import { ThemesController } from './themes.controller'

describe('ThemesController', () => {
  let controller: ThemesController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThemesController],
    }).compile()

    controller = module.get<ThemesController>(ThemesController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
