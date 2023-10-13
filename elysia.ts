import { Elysia } from 'elysia';

const app = new Elysia()
  .state({
    id: 1,
    email: 'jjj@jjj.com',
  })
  .decorate('getDate', () => Date.now())
  // Routes
  .get('/', () => 'Hi Paul')
  .get('/post/:id', ({ params: { id } }) => {
    return { id: id, title: 'Learn Burn' };
  })
  .post('/post', ({ body, set, store }) => {
    console.log(store);
    set.status = 201;
    return body;
  })
  .get('/track/*', () => {
    return 'Track Route';
  })
  .get('/tracks', ({ store, getDate }) => {
    console.log(store);
    console.log(getDate());
    return new Response(
      JSON.stringify({
        tracks: ['Dancing Feet', 'Anarchy in The UK', 'Clash City Rockers'],
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  })
  .get('/tracks2', () => {
    return {
      tracks: [
        'Dancing Feet',
        'Anarchy in The UK',
        'Clash City Rockers',
        'White Riot',
      ],
    };
  })
  // Listens on...
  .listen(3000);

console.log(`Running on ${app.server?.hostname}:${app.server?.port}`);
