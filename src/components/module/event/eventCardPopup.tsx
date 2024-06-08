import { motion } from 'framer-motion';
import { useRef } from 'react';
import Backdrop from '@/components/utils/backdrop';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { EventCardPopupProps } from '@/types';
import React from 'react';

const EventCardPopup = React.forwardRef((props: EventCardPopupProps, ref: any) => {
	const { avatar, name, title, description, setModalOpen } = props;

	return (
		<Backdrop onClick={() => {}}>
			<motion.div
				className="absolute rounded-lg border bg-card text-card-foreground shadow-sm my-2"
				initial={{
					position: 'absolute',
					zIndex: 60,
					top: ref.current?.getBoundingClientRect().top,
					left: ref.current?.getBoundingClientRect().left,

					width: '590px',
					height: '132px',
				}}
				animate={{
					width: '1200px',
					height: '100%',
					borderRadius: '60px',
					top: '222.875px',
					left: '352.5px',
				}}
				exit={{ opacity: 0, scale: 0, transition: { duration: 0.25 } }}
				transition={{ duration: 0.45, ease: 'easeIn' }}
			>
				<div className="flex flex-col w-full">
					<motion.div className="mt-16 mb-4 mx-24 flex flex-row justify-between items-center">
						<div className="space-x-4 flex flex-row items-center">
							<Avatar className="w-[40px] h-[40px]">
								<AvatarImage src={avatar} alt="@shadcn" />
								<AvatarFallback>Avatar</AvatarFallback>
							</Avatar>
							<p>{name}</p>
						</div>
						<motion.div
							className="rounded-full"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							onClick={() => setModalOpen(false)}
						>
							<Image
								src={'/close.gif'}
								alt="close-icon"
								width={28}
								height={28}
								className="bg-transparent hover:scale-110"
							/>
						</motion.div>
					</motion.div>
					<motion.div className="flex flex-col w-full overflow-x-hidden">
						<motion.p
							className="mx-24"
							initial={{ fontSize: '1.25rem' }}
							animate={{ fontSize: '3rem' }}
							transition={{ duration: 0.45 }}
						>
							{title}
						</motion.p>
						<motion.p className="mx-24 text-gray-800">{description}</motion.p>
					</motion.div>
				</div>
			</motion.div>
		</Backdrop>
	);
});

export default EventCardPopup;
