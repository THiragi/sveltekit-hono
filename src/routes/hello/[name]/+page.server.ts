import { getHonoClient } from '$lib/server/hono';
import { error } from '@sveltejs/kit';

export const load = async ({ params, fetch }) => {
	const client = getHonoClient(fetch);
	const res = await client.api.hello[':name'].$get({ param: { name: params.name } });
	if (!res.ok) {
		error(500);
	}
	const { name } = await res.json();

	return { name };
};
