import { Hono } from 'hono';
import { route as hello } from './routes/hello';

export function createApp(basePath: string) {
	const app = new Hono().basePath(basePath);

	const route = app.route('/hello', hello);

	return { app, route };
}
