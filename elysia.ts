import { Elysia } from 'elysia';

new Elysia()
  .get('/', () => 'Hello Paulie !')
  .get('/json', () => ({
    hello: 'world',
  }))
  .listen(3000);
