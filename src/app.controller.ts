import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { EmojiValidationPipe } from './common/emoji-validation/emoji-validation.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Query('index', EmojiValidationPipe) index?: number): string {
    // console.log(`index value from query param`, index);
    return this.appService.getEmoji(index);
  }
}
