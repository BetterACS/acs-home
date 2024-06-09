'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/navbar';
import Body from '@/components/body';
import Footer from '@/components/footer';
import { EventCardProps } from '@/types';
import { isLogin } from '@/utils/Token';
import { verifyToken } from '@/utils/Token';
import { useCookies } from 'next-client-cookies';
import { Post, User } from '@/database/models';

export default function App() {
	const [currentPage, setCurrentPage] = useState('');
	const [events, setEvents] = useState<EventCardProps[]>();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [discord, setDiscord] = useState('');
	const [data, setData] = useState({} as User);
	const cookies = useCookies();
	const [eventDependency, setEventDependency] = useState(false);
	const [eventBookMarkDependency, setBookMarkDependency] = useState(false);
	const handleEventCallBack = () => {
		setEventDependency((prev) => !prev);
	};

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
	const [queryTitleEvent, setQueryTitleEvent] = useState('');

	async function LoadEvent() {
		('use server');
		await fetch(
			`/api/trpc/getPost?input=${encodeURIComponent(
				JSON.stringify({ type: 'event_card', title: queryTitleEvent })
			)}`
		).then(async (res) => {
			const query = await res.json();
			const query_data = query.result.data.data.post;
			//console.log('query_data', query_data);
			setEvents(query_data);
			//console.log('query_data', query_data);
			//console.log(query_data.avatar);
		});
	}

	useEffect(() => {
		const fetchData = async () => {
			await isLoginClient(cookies.get('token') || '');
			setIsfetch(true);
		};
		fetchData();
	}, [cookies]);
	useEffect(() => {
		const fetchData = async () => {
			await LoadEvent();
			setBookMarkDependency(false);
		};
		fetchData();
	}, [eventDependency, queryTitleEvent,eventBookMarkDependency]);

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
		<div
			style={{
				backgroundImage:
					'linear-gradient(65deg, hsl(200deg 65% 80%) 0%, hsl(200deg 62% 83%) 11%, hsl(201deg 57% 87%) 25%, hsl(202deg 51% 90%) 39%,hsl(205deg 39% 93%) 50%,hsl(220deg 14% 96%) 61%,hsl(316deg 22% 92%) 70%,hsl(325deg 34% 89%) 78%,hsl(327deg 42% 86%) 86%,hsl(328deg 47% 82%) 93%,hsl(328deg 50% 79%) 100%)',
			}}
		>
			<p>{}</p>
			<Navbar isLoggedIn={isLoggedIn} data={data} setCurrentPage={setCurrentPage} />
			<div className="flex flex-col justify-center items-center w-full">
				<Body
					currentPage={currentPage}
					data={data}
					isLoggedIn={isLoggedIn}
					setCurrentPage={setCurrentPage}
					events={events || []} // Assign an empty array if events is undefined
					setEvents={setEvents}
					eventDependency={eventDependency}
					handleEventCallBack={handleEventCallBack}
					queryTitleEvent={queryTitleEvent}
					setQueryTitleEvent={setQueryTitleEvent}
					setBookMarkDependency={setBookMarkDependency}
				/>
			</div>
			<Footer />
		</div>
	);
}

export const runtime = 'experimental-edge';
