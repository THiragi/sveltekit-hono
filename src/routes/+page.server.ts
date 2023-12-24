import { getClient } from '$lib/server/hono/client';
import { error } from '@sveltejs/kit';

export const load = async ({ fetch }) => {
	const client = getClient({ fetch });
	const res = await client.hello.$get();
	if (!res.ok) {
		error(500);
	}
	const { message } = await res.json();

	return { message };
};
