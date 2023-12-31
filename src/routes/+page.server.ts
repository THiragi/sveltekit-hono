import { getHonoClient } from '$lib/server/hono';
import { error } from '@sveltejs/kit';

export const load = async ({ fetch }) => {
	const client = getHonoClient(fetch);
	const res = await client.api.hello.$get();
	if (!res.ok) {
		error(500);
	}
	const { message } = await res.json();

	return { message };
};
