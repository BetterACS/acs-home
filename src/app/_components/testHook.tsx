'use client';
import { trpc } from '../_trpc/client';

export default function TestHook() {
	const test = trpc.testQuery.useQuery();
	const hellothere = trpc.hellothere.useQuery();

	return (
		<div>
			<p>{JSON.stringify(test.data)}</p>
			<p>{JSON.stringify(hellothere.data)}</p>
		</div>
	);
}
