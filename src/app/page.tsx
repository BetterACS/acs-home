'use client';

import Navbar from '@/components/navbar';
import Body from '@/components/body';
import Footer from '@/components/footer';
import { useState } from 'react';
import { EventCardProps } from '@/types';

const sampleEvents: EventCardProps[] = [
	{
		id: 0,
		title: 'Just want to install a package. How do I do that?',
		description: 'I am trying to install a package but I am not able to do that. Can someone help me?',
	},
	{
		id: 1,
		title: 'How to use a package?',
		description: 'I have installed a package but I am not able to use it. Can someone help me?',
	},
	{ id: 2, title: 'อยากได้ไอเดียสำหรับโปรเจค', description: 'อยากได้ไอเดียสำหรับโปรเจคที่จะทำ มีใครมีไอเดียบ้าง?' },
	{
		id: 3,
		title: 'แจก 100 coin ขอไอเดียทำเว็บอาจารย์แก๊ส',
		description: 'แจก 100 coin ขอไอเดียทำเว็บอาจารย์แก๊ส มีใครมีไอเดียบ้าง?',
	},
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
