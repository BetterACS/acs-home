'use client';

import { BodyComponentProps } from '@/types';
import EventModule from './module/event/eventModule';
import ShopModule from './module/shop/shopModule';

export default function Body(props: BodyComponentProps) {
	const { currentPage } = props;
	return (
		<div>
			{(currentPage === '' || currentPage.includes('#event-')) && <EventModule {...props} />}
			{currentPage.includes('shop') && <ShopModule />}
		</div>
	);
}
