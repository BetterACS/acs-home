import clsx from 'clsx';
import { cn } from './ui';

interface MultiFunctionButtonProps {
	children: React.ReactNode;
	width: number;
	icon?: React.ReactNode;
}

export default function MultiFunctionButton(props: MultiFunctionButtonProps) {
	const { children, width, icon } = props;
	const buttonClasses = `w-[${width}px] bg-red-200 h-full rounded-[33px]`;

	return <div className={buttonClasses}>{children}</div>;
}
