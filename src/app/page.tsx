'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/navbar';
import Body from '@/components/body';
import Footer from '@/components/footer';
import { EventCardProps } from '@/types';
import { isLogin } from '@/utils/Token';
import { NextRequest } from 'next/server';

import { verifyToken } from '@/utils/Token';
import { useCookies } from 'next-client-cookies';
import { NextPage } from 'next';
import { User } from '@/database/models';
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
	const [discord, setDiscord] = useState('');
	const [data, setData] = useState({} as User);
	const cookies = useCookies();

	async function isLoginClient(cookies: string) {
		('use server');
		if (cookies !== undefined || cookies !== null || cookies !== '') {
			const token = await verifyToken(cookies);
			//console.log('token:', token);
			const discordId = token?.discordId as string;
			if (token !== undefined) {
				//console.log('setIsLoggedIn(true)');
				setIsLoggedIn(true);
				setDiscord(discordId);
			} else {
				//console.log('setIsLoggedIn(false)');
				setIsLoggedIn(false);
			}
		} else {
			//console.log('setIsLoggedIn(false)');
			setIsLoggedIn(false);
		}
	}
	const [isfetch, setIsfetch] = useState(false);
	async function Loaddata() {
		('use server');
		await fetch(`/api/trpc/getUser?input=${encodeURIComponent(JSON.stringify({ discord_id: discord }))}`).then(
			async (res) => {
				const query = await res.json();
				const query_data = query.result.data.data.data as User;
				//console.log('query_data', query_data);
				//console.log(query_data.avatar);
				setData(query_data);
			}
		);
	}

	useEffect(() => {
		const fetchData = async () => {
			await isLoginClient(cookies.get('token') || '');
			setIsfetch(true);
		};
		fetchData();
	}, [cookies]);
	useEffect(() => {
		if (!isfetch) {
			return;
		}
		const fetchData = async () => {
			await Loaddata();
			setIsLoading(false);
		};
		fetchData();
	}, [isfetch]);
	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<p>{}</p>
			<Navbar isLoggedIn={isLoggedIn} data={data} />
			<div className="flex flex-col justify-center items-center w-full">
				<Body
					currentPage={currentPage}
					data={data}
					isLoggedIn={isLoggedIn}
					setCurrentPage={setCurrentPage}
					events={events}
					setEvents={setEvents}
				/>
			</div>
			<Footer />
		</div>
	);
}

export const config = {
	runtime: 'experimental-edge',
};
