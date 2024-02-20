'use client';

import { useState } from 'react';
import { SequentialComponentsProps } from '../../../types';

export default function SequentialComponents<T>(props: SequentialComponentsProps<T>) {
	const { node, initialState, parentStyle, onChildClick, emptyState } = props;

	const [seq, setSeq] = useState<typeof initialState>(initialState);
	return (
		<div className="w-[1200px] rounded-[60px] bg-red-200 min-h-[180px]">
			{seq.length > 0 ? (
				<div className={parentStyle}>
					{seq.map((item: any) => {
						return <props.node key={item.id} {...item} onChildClick={onChildClick} />;
					})}
				</div>
			) : (
				<div>{emptyState}</div>
			)}
		</div>
	);
}
