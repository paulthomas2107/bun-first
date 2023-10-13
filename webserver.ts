import figlet from 'figlet';

const server = Bun.serve({
  port: 3000,
  fetch(req) {
    // Routes
    const url = new URL(req.url);
    if (url.pathname === '/') {
      const body = figlet.textSync('Hola Paul - learning BUN !!');
      return new Response(body);
    }
    if (url.pathname === '/about') {
      return new Response('About me');
    }
    if (url.pathname === '/contact') {
      return new Response('Contact me');
    }
    if (url.pathname === '/greet') {
      return new Response(Bun.file('./greet.txt'));
    }

    // Error handling
    if (url.pathname === '/feed') {
      throw new Error('Could not fetch feed');
    }
    return new Response('404 !');
  },
  error(error) {
    return new Response(`<pre>${error}\n${error.stack}</pre>`, {
      headers: {
        'Content-type': 'text/html',
      },
    });
  },
});

console.log(`Listen on: ${server.port}`);
