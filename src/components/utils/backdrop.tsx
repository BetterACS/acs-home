import { motion } from 'framer-motion';

const Backdrop = ({ children, onClick }: any) => {
	return (
		<motion.div
			onClick={onClick}
			className="backdrop z-100"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			{children}
		</motion.div>
	);
};

export default Backdrop;
