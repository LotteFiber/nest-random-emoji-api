import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { AppService } from '../src/app.service';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let server: App;
  let appService: AppService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    appService = app.get<AppService>(AppService);
    server = app.getHttpServer();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('GET /', () => {
    it('should return a 403 when an invalid api key is used', () => {
      return request(server).get('/').set('x-api-key', 'INVALID').expect(403);
    });

    it('should return a 403 when no api key is passed in', () => {
      return request(server).get('/').expect(403);
    });

    it('should return a random emoji', () => {
      const emojis = appService.getEmojis();
      request(server)
        .get('/')
        .set('x-api-key', 'SECRET')
        .expect(200)
        .expect(({ body }) => {
          expect(emojis).toContain(body.data.emoji);
          expect(body.data.browser).toBe('Unknown');
        });
    });

    it('should return respective user agent', () => {
      const emojis = appService.getEmojis();
      request(server)
        .get('/')
        .set('x-api-key', 'SECRET')
        .set('User-Agent', 'Thunder Client (https://www.thunderclient.com)')
        .expect(200)
        .expect(({ body }) => {
          expect(emojis).toContain(body.data.emoji);
          expect(body.data.browser).toBe('Thunder');
        });
    });

    it('valid index query param returns respective emoji', () => {
      const emojis = appService.getEmojis();
      const index = 0;
      const indexEmoji = emojis[index];
      request(server)
        .get(`/?index=${index}`)
        .set('x-api-key', 'SECRET')
        .expect(200)
        .expect(({ body }) => {
          expect(body.data.emoji).toBe(indexEmoji);
        });
    });

    it('should return a 400 when out of range index is used', () => {
      const emojis = appService.getEmojis();
      const emojiLength = emojis.length;
      const range = emojiLength + 1;
      request(server)
        .get(`/?index=${range}`)
        .set('x-api-key', 'SECRET')
        .expect(400);
    });

    it('should return a 400 the index is non-number', () => {
      request(server)
        .get('/?index=non-number')
        .set('x-api-key', 'SECRET')
        .expect(400);
    });
  });
});
