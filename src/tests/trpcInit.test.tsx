import { caller } from '@/server';

test('initialize TRPC api test', async () => {
	const testQuery = await caller.testQuery();
	expect(testQuery.message).toBe('Hello world! if you see this, it means that trpc is working!');
	const testMutation = await caller.testMutation({ name: 'test' });
	expect(testMutation.message).toBe('Hi test!');
});
