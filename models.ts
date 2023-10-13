import { t } from 'elysia';

export const signInDTO = t.Object({
  username: t.String(),
  password: t.String(),
  attempts: t.Number(),
});
