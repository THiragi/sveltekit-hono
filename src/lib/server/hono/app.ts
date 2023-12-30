import { Hono } from 'hono';
import { route as hello } from './routes/hello';
import { route as test } from './routes/test';

export function createApp(basePath: string) {
	const app = new Hono().basePath(basePath);

	const route = app.route('/hello', hello).route('/hello/rpc/test', test);

	return { app, route };
}
