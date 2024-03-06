'use client';

import Navbar from './_components/navbar';
import Body from './_components/body';
import Footer from './_components/footer';
import { useEffect, useState } from 'react';
import { EventCardProps } from '@/types';
import { isLogin } from '@/utils/Token';
import { NextRequest } from 'next/server';

import { verifyToken } from '@/utils/Token';
import { useCookies } from 'next-client-cookies';
import { NextPage } from 'next';
const sampleEvents: EventCardProps[] = [
	{ id: 0, title: 'Event 1', description: 'Description 1' },
	{ id: 1, title: 'Event 2', description: 'Description 2' },
	{ id: 2, title: 'Event 3', description: 'Description 3' },
	{ id: 3, title: 'Event 4', description: 'Description 4' },
];

export default function App() {
	const [currentPage, setCurrentPage] = useState('');
	const [events, setEvents] = useState<EventCardProps[]>(sampleEvents);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const cookies = useCookies();

	async function isLoginClient(cookies: string) {
		if (cookies !== undefined || cookies !== null || cookies !== '') {
			const token = await verifyToken(cookies);
			if (token !== undefined || token !== null || token !== '') {
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}
		} else {
			setIsLoggedIn(false);
		}
		setIsLoading(false);
	}

	useEffect(() => {
		isLoginClient(cookies.get('token') || '');
	}, [cookies]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<p>{}</p>
			<Navbar isLoggedIn={isLoggedIn} />
			<div className="flex flex-col justify-center items-center w-full">
				<Body currentPage={currentPage} setCurrentPage={setCurrentPage} events={events} setEvents={setEvents} />
			</div>
			<Footer />
		</div>
	);
}
