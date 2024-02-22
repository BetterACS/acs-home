'use client';

import { SequentialComponentsProps } from '@/types';

export default function SequentialComponents<T>(props: SequentialComponentsProps<T>) {
	const { initialState, parentStyle, onChildClick, emptyState } = props;
	const items = initialState;

	return (
		<div className="w-[1200px] rounded-[60px] bg-red-200 min-h-[180px]">
			{items.length > 0 ? (
				<div className={parentStyle}>
					{items.map((item: any) => {
						return <props.node key={item.id} {...item} onChildClick={onChildClick} />;
					})}
				</div>
			) : (
				<div>{emptyState}</div>
			)}
		</div>
	);
}
