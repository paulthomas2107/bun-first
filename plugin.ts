import { Elysia } from 'elysia';
// Define plugin
export const plugin = new Elysia()
  .state('plugin-version', 1)
  .get('/form-plugin', () => 'Hi...Paul !!!')
  .get('/greet', () => 'Hello, again :)');
