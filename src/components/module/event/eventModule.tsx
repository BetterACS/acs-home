'use client';

import { BodyComponentProps, EventCardProps } from '@/types';
import EventCard from './eventCard';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBox from './searchBox';
import { useEffect, useState } from 'react';
import EventModal from './eventModal';
import GitHubCarousel from './githubCarousel';
import { User } from '@/database/models';

export default function EventModule(props: BodyComponentProps) {
	const {
		currentPage,
		setCurrentPage,
		events,
		isLoggedIn,
		data,
		eventDependency,
		handleEventCallBack,
		queryTitleEvent,
		setQueryTitleEvent,
	} = props;

	async function loadAllUserData(events: EventCardProps[]) {
		const userPromises = events.map(async (event) => {
			const res = await fetch(
				`/api/trpc/getUserBy_id?input=${encodeURIComponent(JSON.stringify({ _id: event.user_id }))}`
			);
			const query = await res.json();
			return {
				...event,
				user: query.result.data.data.data as User,
			};
		});
		return Promise.all(userPromises);
	}

	const [eventsWithUserData, setEventsWithUserData] = useState([] as any[]);
	const [carouselDependency, setCarouselDependency] = useState(false);
	const [query_title_carousel, setQueryTitleCarousel] = useState('');
	useEffect(() => {
		async function fetchData() {
			const data = await loadAllUserData(events);
			setEventsWithUserData(data);
		}
		fetchData();
	}, [events]);

	const [modalOpen, setModalOpen] = useState(false);

	const open = () => setModalOpen(true);
	const close = () => setModalOpen(false);

	const clickPost = (id: number) => {
		console.log('clickPost', id);
		// console.log('clickPost', id, '#event-' + id.toString());
		// setCurrentPage('#event-' + id.toString());
	};

	function getEventFromEventString(eventString: string): EventCardProps | undefined {
		const id = parseInt(eventString.split('-')[1]);
		return events.find((event) => event._id === id);
	}

	useEffect(() => {
		if (modalOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
	}, [modalOpen]);

	const handleCarouselCallBack = () => {
		setCarouselDependency((prev) => !prev);
	};

	return (
		<motion.div
			initial={{ y: 600, opacity: 0 }}
			animate={{ y: 0, opacity: 1, transition: { duration: 1 } }}
			exit={{ translateY: 1000, opacity: 0, transition: { duration: 1.2 } }}
		>
			<AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
				{modalOpen && isLoggedIn && (
					<EventModal
						modalOpen={modalOpen}
						handleClose={close}
						data={data}
						carouselCallBack={handleCarouselCallBack}
						eventCallBack={handleEventCallBack}
					/>
				)}
			</AnimatePresence>

			{/* Event Card List */}
			<div className="w-[1200px] pb-[34px] mx-[360px]">
				{/* <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
					{currentPage === '' && }
				</AnimatePresence> */}
				<SearchBox
					setModalOpen={open}
					setQueryTitleEvent={setQueryTitleEvent}
					setQueryTitleCarousel={setQueryTitleCarousel}
				/>
			</div>

			<motion.div
				// className="w-[1200px] rounded-[60px] bg-red-200 min-h-[180px]"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
			>
				<div
					className="w-full h-[460px] flex flex-col justify-center items-center"
					style={{ backgroundColor: '#4287f5' }}
				>
					{queryTitleEvent !== '' && <p className="text-white text-2xl">Search: {queryTitleEvent}</p>}
					<GitHubCarousel
						onCardClick={clickPost}
						callBack={handleCarouselCallBack}
						dependency={carouselDependency}
						query_title_carousel={query_title_carousel}
						userData={data}
					/>
				</div>
				<div className="flex flex-col items-center">
					<p className="mt-[40px] text-3xl font-bold">Non project requests</p>
					<p>This is a place for people who ask for help or give ideas for a project.</p>
				</div>
				<div className="mt-8 mb-[120px] flex flex-col items-center">
					<div className="flex flex-row flex-wrap justify-between w-[1200px] pb-8">
						{eventsWithUserData.map((event) => {
							//await LoaddataUser(event.user_id.toString())
							return (
								<EventCard
									key={event._id}
									id={event._id}
									name={event.user.name}
									title={event.title}
									description={event.description}
									onChildClick={clickPost}
									avatar={`https://cdn.discordapp.com/avatars/${event.user.discord_id}/${event.user.avatar}.png`}
									coin={event.coin_reward}
									due_date={Math.max(
										Math.ceil(
											(new Date(event.due_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
										),
										0
									)}
									user={data}
								/>
							);
						})}
						{/* <EventCard id={0} title="event1" description="desc1" onChildClick={clickPost} />
							<EventCard id={1} title="event2" description="desc2" onChildClick={clickPost} />
							<EventCard id={2} title="event3" description="desc3" onChildClick={clickPost} />
							<EventCard id={3} title="event4" description="desc4" onChildClick={clickPost} /> */}
					</div>
					{/* <HoverEffect items={requests} onCardClick={clickPost} /> */}
				</div>
			</motion.div>
			{/* Event Card Post */}
			{/* <AnimatePresence initial={false} mode="wait">
				{currentPage.includes('#event-') && (
					<EventCardPost
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						event={getEventFromEventString(currentPage)}
					/>
				)}
			</AnimatePresence>{' '} */}
		</motion.div>
	);
}
