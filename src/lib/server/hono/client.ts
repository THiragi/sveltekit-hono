import { createApp } from './app';
import { hc } from 'hono/client';

type AppType = ReturnType<typeof createApp>['route'];

type GetClientOptions = {
	fetch?: typeof globalThis.fetch;
	path?: string;
};

export function getClient({ path = '/api', fetch = globalThis.fetch }: GetClientOptions = {}) {
	return hc<AppType>(path, { fetch });
}
