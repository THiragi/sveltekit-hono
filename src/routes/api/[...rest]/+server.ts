import { createApp } from '$lib/server/app';

const app = createApp('/api');

export const GET = async ({ request }) => {
	return await app.fetch(request);
};
