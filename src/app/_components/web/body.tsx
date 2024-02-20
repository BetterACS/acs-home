'use client';

import { BodyComponentProps, WebComponentProps, EventCardProps } from '../../../types';
import SequentialComponents from '../specific/sequentialComponents';
import EventCard from '../specific/eventCard';
import { useEffect, useState } from 'react';
import EventCardModal from '../modal/eventCardModal';
import { motion, AnimatePresence } from 'framer-motion';

const sampleEvents: EventCardProps[] = [
	{ id: 0, title: 'Event 1', description: 'Description 1' },
	{ id: 1, title: 'Event 2', description: 'Description 2' },
];

export default function Body(props: WebComponentProps) {
	const { currentPage, setCurrentPage } = props;
	// const [modal, setModal] = useState(false);
	const [events, setEvents] = useState<EventCardProps[]>(sampleEvents);

	function getEventFromId(id: number): EventCardProps | undefined {
		return events.find((event) => event.id === id);
	}

	return (
		<div className="pt-[34px]">
			<AnimatePresence initial={false} mode="wait">
				{currentPage === '' && (
					<motion.div
						className="w-[1200px] rounded-[60px] bg-red-200 min-h-[180px]"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 2.75, ease: 'easeOut' }}
					>
						<SequentialComponents<EventCardProps>
							node={EventCard}
							initialState={events}
							onChildClick={(i: number) => setCurrentPage('#event-' + i.toString())}
							parentStyle="py-[72px] flex flex-col justify-between"
							emptyState="No events available"
						/>
					</motion.div>
				)}
			</AnimatePresence>

			{/* <AnimatePresence initial={false} mode="wait">
				{currentPage.includes('#event-') && (
					<motion.div
						// className="w-[1200px] rounded-[33px] bg-red-200 min-h-[180px]"
						initial={{
							opacity: 0,
							width: '960px',
							backgroundColor: 'red',
							height: '144px',
							borderRadius: '33px',
						}}
						animate={{
							opacity: 1,
							width: '1200px',
							backgroundColor: 'red',
							height: '100%',
							minHeight: '720px',
							borderRadius: '60px',
						}}
						exit={{ opacity: 0, scale: 0 }}
						transition={{ duration: 1.25, ease: 'easeIn' }}
					>
						Hello
					</motion.div>
				)}
			</AnimatePresence> */}
		</div>
	);
}
