import { BodyComponentProps, WebComponentProps, EventCardProps } from '../../../../types';
import SequentialComponents from '../../utils/sequentialComponents';
import EventCard from './eventCard';
import { EventCardPost } from './eventCard';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBox from './searchBox';

export default function EventModule(props: BodyComponentProps) {
	const { currentPage, setCurrentPage, events, setEvents } = props;

	function getEventFromEventString(eventString: string): EventCardProps | undefined {
		const id = parseInt(eventString.split('-')[1]);
		return events.find((event) => event.id === id);
	}

	return (
		<div>
			<div className="pt-[372px] w-[1200px] mb-[34px]">
				<AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
					{currentPage === '' && <SearchBox />}
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
