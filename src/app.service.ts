import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getEmoji(): string {
    const emojis = this.getEmojis();
    const randomIndex = Math.floor(Math.random() * emojis.length);
    return emojis[randomIndex];
  }

  getEmojis() {
    return ['😀', '😂', '🥳', '😎', '🤖', '🐶', '🍕', '🚀', '🌈', '🎉'];
  }
}
