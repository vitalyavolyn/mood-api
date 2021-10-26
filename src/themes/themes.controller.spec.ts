import { Test, TestingModule } from '@nestjs/testing'
import { ThemesController } from './themes.controller'
import { ThemesService } from './themes.service'

describe('ThemesController', () => {
  let controller: ThemesController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThemesController],
      providers: [ThemesService],
    }).compile()

    controller = module.get<ThemesController>(ThemesController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
