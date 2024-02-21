import { motion } from 'framer-motion';
import Backdrop from '../../utils/backdrop';

const EventModal = ({ handleClose, text }: any) => {
	return (
		<Backdrop onClick={handleClose}>
			<motion.div
				onClick={(e) => e.stopPropagation()}
				className="rounded-[34px]"
				style={{ width: '968px', height: '688px', background: '#E8E4E4' }}
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

				<div style={{ overflowY: 'auto', maxHeight: '606px' }}>
					<div
						className="mt-[78px] ml-[95px] w-[747px] h-[78px] rounded-[33px]"
						style={{ background: '#BEBEBE' }}
					></div>
				</div>

				<p>{text}</p>
			</motion.div>
		</Backdrop>
	);
};

export default EventModal;
