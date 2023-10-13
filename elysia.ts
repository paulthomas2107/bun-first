import { Elysia, t } from 'elysia';
import { plugin } from './plugin';
import { signInDTO } from './models';

const app = new Elysia()
  .use(plugin)
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
    console.log(store['plugin-version']);
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
  });
app.group('/user', (app) =>
  app
    .post('/sign-in', ({ body }) => body, {
      body: signInDTO,
      response: signInDTO,
    })
    .post('/sign-up', () => 'Signup Route')
    .post('/profile', () => 'Profile Route')
    .get('/:id', () => 'User By Id')
);
app.group('/v1', (app) =>
  app
    .get('/', () => 'Version 1')
    .group('/products', (app) =>
      app
        .post('/', () => 'Create Prducts')
        .get(
          '/:id',
          ({ params: { id } }) => {
            return id;
          },
          {
            params: t.Object({
              id: t.Numeric(),
            }),
          }
        )
        .put('/:id', () => 'Update Product by Id')
        .delete('/:id', () => 'Delete Product by Id')
    )
);
// Listens on...
app.listen(3000);

console.log(`Running on ${app.server?.hostname}:${app.server?.port}`);
