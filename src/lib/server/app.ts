import { Hono } from 'hono';

export function createApp(basePath: string) {
	const app = new Hono();

	app.basePath(basePath);

	app.get('/hello', async (c) => {
		return c.json({
			message: 'Hello Hono!'
		});
	});

	return app;
}
