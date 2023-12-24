import { createApp } from '$lib/server/hono/app';

const { app } = createApp('/api');

export const GET = async ({ request }) => {
	return await app.fetch(request);
};

export const POST = GET;
export const PUT = GET;
