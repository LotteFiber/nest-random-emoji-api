import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { EmojiValidationPipe } from './common/emoji-validation/emoji-validation.pipe';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(
    @Req() request: Request,
    @Query('index', EmojiValidationPipe) index?: number,
  ) {
    console.log(`index value from query param`, index);
    return {
      emoji: this.appService.getEmoji(index),
      browser: request.headers.browser,
    };
  }
}
