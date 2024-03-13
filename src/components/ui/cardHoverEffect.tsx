import { cn } from '@/components/utils/ui';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
export const HoverEffect = ({
	items,
	className,
}: {
	items: {
		title: string;
		description: string;
		link: string;
	}[];
	className?: string;
}) => {
	let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	return (
		<div className={cn('grid grid-cols-1 md:grid-cols-2 py-12', className)}>
			{items.map((item, idx) => (
				<Link
					href={item?.link}
					key={item?.link}
					className="relative group  block p-2 h-full w-full"
					onMouseEnter={() => setHoveredIndex(idx)}
					onMouseLeave={() => setHoveredIndex(null)}
				>
					<AnimatePresence>
						{hoveredIndex === idx && (
							<motion.span
								className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
								layoutId="hoverBackground"
								initial={{ opacity: 0 }}
								animate={{
									opacity: 1,
									transition: { duration: 0.15 },
								}}
								exit={{
									opacity: 0,
									transition: { duration: 0.15, delay: 0.2 },
								}}
							/>
						)}
					</AnimatePresence>
					<CardHover>
						<CardTitle>{item.title}</CardTitle>
						<CardDescription>{item.description}</CardDescription>
					</CardHover>
				</Link>
			))}
		</div>
	);
};

export const CardHover = ({ className, children }: { className?: string; children: React.ReactNode }) => {
	return (
		<Card
			className={cn(
				'flex flex-row items-center rounded-2xl w-[580px] h-[140px] p-4 m-2 overflow-hidden dark:border-white/[0.2] group-hover:border-slate-700 relative z-20',
				className
			)}
		>
			<Avatar className="w-[60px] h-[60px] mx-6">
				<AvatarImage src="https://avatars.githubusercontent.com/u/66357924?v=4" alt="@shadcn" />
				<AvatarFallback>Avatar</AvatarFallback>
			</Avatar>
			<div className="p-2 flex flex-col">{children}</div>
		</Card>
	);
};
export const CardTitle = ({ className, children }: { className?: string; children: React.ReactNode }) => {
	return <h4 className={cn('text-zinc-700 font-bold tracking-wide mt-2 line-clamp-1', className)}>{children}</h4>;
};
export const CardDescription = ({ className, children }: { className?: string; children: React.ReactNode }) => {
	return (
		<p className={cn('mt-2 text-zinc-400 tracking-wide leading-relaxed text-sm line-clamp-3', className)}>
			{children}
		</p>
	);
};
