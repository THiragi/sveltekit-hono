import { Hono } from 'hono';

const app = new Hono();

export const route = app
	.get('/', (c) => {
		return c.json({ message: 'Hello Svelte hono!' });
	})
	.get('/:name', (c) => {
		const { name } = c.req.param();
		return c.json({ name });
	});
