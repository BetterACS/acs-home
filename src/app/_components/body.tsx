'use client';

import { BodyComponentProps } from '@/types';
import EventModule from './module/event/eventModule';

export default function Body(props: BodyComponentProps) {
	const { currentPage } = props;
	return <div>{(currentPage === '' || currentPage.includes('#event-')) && <EventModule {...props} />}</div>;
}
