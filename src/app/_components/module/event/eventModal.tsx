import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import Backdrop from '../../utils/backdrop';
import DatePicker from '../../utils/datepicker';
import type { TagItem } from '@/types';
import EventModalInput, { SelfExpandTextarea, TagInput } from './eventModalInput';

const example_items: TagItem[] = [
	{ value: '1', label: 'One' },
	{ value: '2', label: 'Two' },
	{ value: '3', label: 'Three' },
];

const EventModal = ({ handleClose }: any) => {
	return (
		<Backdrop onClick={handleClose}>
			<motion.div
				onClick={(e) => e.stopPropagation()}
				className="rounded-[34px] bg-white w-[968px] h-[688px]"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
			>
				<div
					className="flex flex-col w-full h-[85px] items-end"
					style={{ background: '#BEBEBE', borderRadius: '34px 34px 0 0' }}
				>
					<div className="m-4 rounded-full w-[48px] h-[48px] bg-gray-200" onClick={handleClose}></div>
				</div>

				<div className="flex flex-col items-center h-full" style={{ overflowY: 'auto', maxHeight: '560px' }}>
					<Input
						className="w-[747px] h-[78px] mt-[78px] text-4xl focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-0"
						style={{ background: '#E8E4E4' }}
						placeholder="Unititled"
						autoFocus
					/>

					<div className="self-start w-[480px] ml-[124px]">
						<EventModalInput label="Due date" marginTop={30} width={240} textSize="lg">
							<DatePicker />
						</EventModalInput>

						<EventModalInput label="Coin" marginTop={20} width={240} textSize="lg">
							<Input className="w-[200px]" placeholder="100+" />
						</EventModalInput>

						<EventModalInput label="Type" marginTop={20} width={240} textSize="lg">
							<TagInput message="Select item" items={example_items} />
						</EventModalInput>
					</div>

					<div className="w-[747px] mt-[40px] h-full">
						<SelfExpandTextarea />
					</div>
				</div>
			</motion.div>
		</Backdrop>
	);
};

export default EventModal;
