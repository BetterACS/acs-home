'use client';

import { BodyComponentProps, WebComponentProps, EventCardProps } from '../../types';
import EventModule from './module/event/eventModule';

export default function Body(props: BodyComponentProps) {
	const { currentPage, setCurrentPage, events, setEvents } = props;
	return <div>{(currentPage === '' || currentPage.includes('#event-')) && <EventModule {...props} />}</div>;
}
