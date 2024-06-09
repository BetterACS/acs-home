import { motion } from 'framer-motion';
import { cn } from './ui';
const Backdrop = ({ children, onClick, className }: any) => {
	return (
		<motion.div
			onClick={onClick}
			className={cn('backdrop z-50', className)}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			{children}
		</motion.div>
	);
};

export default Backdrop;
