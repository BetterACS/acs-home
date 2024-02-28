'use client';

import Navbar from '@/components/navbar';
import Body from '@/components/body';
import Footer from '@/components/footer';
import { useState } from 'react';
import { EventCardProps } from '@/types';

const sampleEvents: EventCardProps[] = [
	{ id: 0, title: 'Event 1', description: 'Description 1' },
	{ id: 1, title: 'Event 2', description: 'Description 2' },
	{ id: 2, title: 'Event 3', description: 'Description 3' },
	{ id: 3, title: 'Event 4', description: 'Description 4' },
];

export default function App() {
	const [currentPage, setCurrentPage] = useState('');
	const [events, setEvents] = useState<EventCardProps[]>(sampleEvents);

	return (
		<div>
			<Navbar />
			<div className="flex flex-col justify-center items-center w-full">
				<Body currentPage={currentPage} setCurrentPage={setCurrentPage} events={events} setEvents={setEvents} />
			</div>
			<Footer />
		</div>
	);
}
