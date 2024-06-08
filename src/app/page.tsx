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
import { Post, User } from '@/database/models';
// const sampleEvents: EventCardProps[] = [
// 	{
// 		id: 0,
// 		title: 'Just want to install a package. How do I do that?',
// 		description: 'I am trying to install a package but I am not able to do that. Can someone help me?',
// 	},
// 	{
// 		id: 1,
// 		title: 'How to use a package?',
// 		description: 'I have installed a package but I am not able to use it. Can someone help me?',
// 	},
// 	{ id: 2, title: 'อยากได้ไอเดียสำหรับโปรเจค', description: 'อยากได้ไอเดียสำหรับโปรเจคที่จะทำ มีใครมีไอเดียบ้าง?' },
// 	{
// 		id: 3,
// 		title: 'แจก 100 coin ขอไอเดียทำเว็บอาจารย์แก๊ส',
// 		description: 'แจก 100 coin ขอไอเดียทำเว็บอาจารย์แก๊ส มีใครมีไอเดียบ้าง?',
// 	},
// ];

export default function App() {
	const [currentPage, setCurrentPage] = useState('');
	const [events, setEvents] = useState<EventCardProps[]>();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [discord, setDiscord] = useState('');
	const [data, setData] = useState({} as User);
	const cookies = useCookies();
	const [eventDependency, setEventDependency] = useState(false);
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
	const [query_title_event, setQueryTitleEvent] = useState('');

	async function LoadEvent() {
		('use server');
		await fetch(`/api/trpc/getPost?input=${encodeURIComponent(JSON.stringify({ type: 'event_card',title:query_title_event }))}`).then(
			async (res) => {
				const query = await res.json();
				const query_data = query.result.data.data.post;
				//console.log('query_data', query_data);
				setEvents(query_data);
				//console.log('query_data', query_data);
				//console.log(query_data.avatar);
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
		const fetchData = async () => {
			await LoadEvent();
		};
		fetchData();
	}, [eventDependency,query_title_event]);

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
			<Navbar isLoggedIn={isLoggedIn} data={data} />
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
					setQueryTitleEvent={setQueryTitleEvent}
				/>
			</div>
			<Footer />
		</div>
	);
}

export const runtime = 'experimental-edge';
