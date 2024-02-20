import Backdrop from '../utils/backdrop';
import { motion } from 'framer-motion';

const animation = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
	exit: { opacity: 0 },
};

export default function EventCardModal({ handleClose, text }: any) {
	return (
		<Backdrop onClick={handleClose}>
			<motion.div
				className="modal"
				onClick={(e) => e.stopPropagation()}
				variants={animation}
				initial="hidden"
				animate="visible"
				exit="exit"
			>
				{text}
			</motion.div>
		</Backdrop>
	);
}
