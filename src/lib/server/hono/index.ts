import { Hono } from 'hono';
import { hc } from 'hono/client';
import { route as hello } from './routes/hello';

export const app = new Hono().basePath('/api');

const route = app.route('/hello', hello);

export function getHonoClient(customFetch: typeof fetch = globalThis.fetch) {
	return hc<typeof route>('/', { fetch: customFetch });
}
