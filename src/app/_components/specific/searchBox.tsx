import { motion } from 'framer-motion';

interface MultiFunctionButtonProps {
	children: React.ReactNode;
	width: number;
	icon?: React.ReactNode;
}

function MultiFunctionButton(props: MultiFunctionButtonProps) {
	const { children, width, icon } = props;
	const buttonClasses = `w-[${width}px] bg-red-200 h-full rounded-[33px]`;
	return <div className={buttonClasses}>{children}</div>;
}

export default function SearchBox() {
	return (
		<motion.div
			className="flex flex-row h-[164px] w-full justify-between"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<MultiFunctionButton width={477}>Create</MultiFunctionButton>
			<MultiFunctionButton width={685}>Search</MultiFunctionButton>
		</motion.div>
	);
}
