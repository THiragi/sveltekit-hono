import { createApp } from '$lib/server/hono/app';

export type AppRouteType = ReturnType<typeof createApp>['route'];

export type GetClientOptions = {
	fetch?: typeof globalThis.fetch;
	path?: string;
};
