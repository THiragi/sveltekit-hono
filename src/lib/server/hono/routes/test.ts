import { Hono } from 'hono';

const app = new Hono();

export const route = app.get('/', (c) => {
	return c.json({ message: 'Hello Hono RPC!' });
});
