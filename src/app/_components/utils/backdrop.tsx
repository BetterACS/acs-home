import { motion } from 'framer-motion';
import React from 'react';

interface BackdropProps {
	children: React.ReactNode;
	onClick: () => void;
}

export default function Backdrop(props: BackdropProps) {
	const { children, onClick } = props;
	return (
		<motion.div
			className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center bg-orange-200"
			onClick={onClick}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			{children}
		</motion.div>
	);
}
