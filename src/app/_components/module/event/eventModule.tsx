'use client';

import { BodyComponentProps, EventCardProps } from '@/types';
import SequentialComponents from '../../utils/sequentialComponents';
import EventCard, { EventCardPost } from './eventCard';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBox from './searchBox';
import { useEffect, useState } from 'react';
import EventModal from './modal/eventModal';

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
			<div className="pt-[372px] w-[1200px] mb-[34px]">
				<AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
					{currentPage === '' && <SearchBox setModalOpen={open} />}
				</AnimatePresence>
			</div>
			<AnimatePresence initial={false} mode="wait">
				{currentPage === '' && (
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
				)}
			</AnimatePresence>
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
