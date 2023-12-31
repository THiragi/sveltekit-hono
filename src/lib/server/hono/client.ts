import type { AppRouteType, GetClientOptions } from '$lib/types/hono';
import { hc } from 'hono/client';

export function getClient({ path = '/api', fetch = globalThis.fetch }: GetClientOptions = {}) {
	return hc<AppRouteType>(path, { fetch });
}
