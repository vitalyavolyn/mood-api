import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common'
import { InjectUser } from '../user/user.decorator'
import { UserDocument } from '../user/schemas/user.schema'
import { CreateEntryDto } from './dto/create-entry.dto'
import { UpdateDeleteEntryDto } from './dto/update-delete-entry.dto'
import { SearchEntriesDto } from './dto/search-entries.dto'
import { EntriesService } from './entries.service'

@Controller('/user/entries')
export class EntriesController {
  constructor(private entriesService: EntriesService) {}

  @Post()
  async createEntry(
    @InjectUser() user: UserDocument,
    @Body() createEntryDto: CreateEntryDto,
  ) {
    return this.entriesService.addEntry(user, createEntryDto)
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteEntry(
    @InjectUser() user: UserDocument,
    @Param() params: UpdateDeleteEntryDto,
  ) {
    return this.entriesService.deleteEntry(user, params.id)
  }

  // TODO: по логике должно быть Get? но работать с json приятнее...
  @Post('/search')
  async searchEntries(
    @InjectUser() user: UserDocument,
    @Body() searchParams: SearchEntriesDto,
  ) {
    return this.entriesService.searchEntries(user, searchParams)
  }

  @Post('/:id')
  async updateEntry(
    @InjectUser() user: UserDocument,
    @Param() params: UpdateDeleteEntryDto,
    @Body() data: CreateEntryDto,
  ) {
    return this.entriesService.updateEntry(user, params.id, data)
  }
}
