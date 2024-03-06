'use client';

import { BodyComponentProps, EventCardProps } from '@/types';
import SequentialComponents from '../../utils/sequentialComponents';
import EventCard, { EventCardPost } from './eventCard';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBox from './searchBox';
import { use, useEffect, useState } from 'react';
import EventModal from './eventModal';
import GitHubCarousel from './githubCarousel';

export default function EventModule(props: BodyComponentProps) {
	const { currentPage, setCurrentPage, events } = props;

	const [modalOpen, setModalOpen] = useState(false);

	const open = () => setModalOpen(true);
	const close = () => setModalOpen(false);

	function getEventFromEventString(eventString: string): EventCardProps | undefined {
		const id = parseInt(eventString.split('-')[1]);
		return events.find((event) => event.id === id);
	}

	useEffect(() => {
		if (modalOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
	}, [modalOpen]);

	return (
		<div>
			<AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
				{modalOpen && <EventModal modalOpen={modalOpen} handleClose={close} />}
			</AnimatePresence>
			{/* Event Card List */}
			<div className="pt-[234px] w-[1200px] pb-[34px] mx-[360px]">
				<AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
					{currentPage === '' && <SearchBox setModalOpen={open} />}
				</AnimatePresence>
			</div>
			{/* {currentPage === '' && (
					<motion.div
						className="w-[1200px] rounded-[60px] bg-red-200 min-h-[180px]"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<SequentialComponents<EventCardProps>
							node={EventCard}
							initialState={events}
							onChildClick={(i: number) => setCurrentPage('#event-' + i.toString())}
							parentStyle="py-[72px] flex flex-col justify-between"
							emptyState="No events available"
						/>
					</motion.div>
				)} */}
			<div className="w-screen h-[460px] flex flex-col justify-center" style={{ backgroundColor: '#D9D9D9' }}>
				<GitHubCarousel />
			</div>
			{/* Event Card Post */}
			<AnimatePresence initial={false} mode="wait">
				{currentPage.includes('#event-') && (
					<EventCardPost
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						event={getEventFromEventString(currentPage)}
					/>
				)}
			</AnimatePresence>{' '}
		</div>
	);
}
