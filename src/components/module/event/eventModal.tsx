import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import Backdrop from '../../utils/backdrop';
import DatePicker from '../../utils/datepicker';
import type { TagItem } from '@/types';
import EventModalInput, { SelfExpandTextarea, TagInput } from './eventModalInput';
import { Button } from '@/components/ui/button';
import { CalendarDays, Coins, Github, X, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const EventModal = ({ handleClose }: any) => {
	return (
		<Backdrop onClick={handleClose}>
			<motion.div
				onClick={(e) => e.stopPropagation()}
				className="rounded-[16px] bg-white w-[968px] h-[700px]"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
			>
				<div className="flex flex-row items-center m-6 justify-end">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<Info size={30} />
							</TooltipTrigger>
							<TooltipContent>
								<p>Create a request and let the community help you with your project.</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					<X className="ml-2 hover:scale-110 cursor-pointer" size={38} onClick={handleClose} />
				</div>

				<div className="flex flex-col items-center h-full" style={{ overflowY: 'auto', maxHeight: '560px' }}>
					<Input
						className="w-[700px] h-[78px] mt-[8px] text-4xl focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-0"
						style={{ background: '#E8E4E4' }}
						placeholder="Unititled"
						autoFocus
					/>

					<div className="self-start w-[433px] ml-[156px]">
						<EventModalInput label="Due date" marginTop={30} width={200} icon={<CalendarDays />}>
							<DatePicker />
						</EventModalInput>

						<EventModalInput label="Coin" marginTop={16} width={200} icon={<Coins />}>
							<Input className="w-[200px]" placeholder="100+" />
						</EventModalInput>

						<EventModalInput label="Github repo" marginTop={16} width={200} icon={<Github />}>
							<Input className="w-[200px]" placeholder="owner / repository" />
						</EventModalInput>
					</div>

					<div className="w-[700px] mt-[40px] h-full">
						<SelfExpandTextarea />
					</div>
				</div>
				<center>
					<Button className="text-lg bg-blue-600 hover:bg-blue-500 transition-all duration-200 hover:shadow-xl hover:scale-105">
						Create
					</Button>
				</center>
			</motion.div>
		</Backdrop>
	);
};

export default EventModal;
