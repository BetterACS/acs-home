/**
 * @jest-environment node
 */
import '@testing-library/jest-dom';
import { caller } from '@/server';

test('initialize TRPC api test', async () => {
	const { message } = await caller.test();
	expect(message).toBe('Hello world! if you see this, it means that trpc is working!');
});
