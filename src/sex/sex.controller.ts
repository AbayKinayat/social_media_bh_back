import { Sex } from './sex.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { SexService } from './sex.service';

@ApiTags("Пол")
@Controller('sex')
export class SexController {

  constructor(
    private sexService: SexService
  ) {}

  @Get()
  @ApiOperation({ summary: "Получить все пола пользователей",  })
  @ApiResponse({ status: 200, type: Sex })
  get() {
    return this.sexService.getAll();
  }
}
