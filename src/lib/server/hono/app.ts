import { Hono } from 'hono';

export function createApp(basePath: string) {
	const app = new Hono().basePath(basePath);

	const route = app
		.get('/', (c) => {
			return c.json({
				message: 'Hello World!'
			});
		})
		.get('/hello', (c) => {
			return c.json({
				message: 'Hello Hono!'
			});
		});

	return { app, route };
}
