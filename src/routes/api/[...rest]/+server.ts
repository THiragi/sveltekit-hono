import { app } from '$lib/server/hono';

export const GET = async ({ request }) => {
	return await app.fetch(request);
};

export const POST = GET;
export const PUT = GET;
