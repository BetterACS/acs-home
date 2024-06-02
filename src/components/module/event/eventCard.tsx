'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { use, useRef, useState } from 'react';
import Backdrop from '@/components/utils/backdrop';
import Image from 'next/image';

export default function EventCard(props: any) {
	const {
		id,
		title,
		description,
		onChildClick,
		avatar = 'https://avatars.githubusercontent.com/u/66357924?v=4',
	} = props;
	const [modalOpen, setModalOpen] = useState(false);
	const cardRef = useRef<any>();
	const open = () => {
		setModalOpen(true);
		onChildClick(id);
	};

	return (
		<div>
			{modalOpen && (
				<Backdrop onClick={() => {}}>
					<motion.div
						className="rounded-lg border bg-card text-card-foreground shadow-sm my-2"
						initial={{
							position: 'absolute',
							zIndex: 60,
							top: cardRef.current?.getBoundingClientRect().top,
							left: cardRef.current?.getBoundingClientRect().left,

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
									<p>Monchinawat</p>
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
									<p>{title}</p>
								</motion.p>
								<motion.p className="mx-24 text-gray-800">{description}</motion.p>
							</motion.div>
						</div>
					</motion.div>
				</Backdrop>
			)}

			<Card
				ref={cardRef}
				className="hover:shadow-xl hover:scale-[101%] my-2 w-[590px] h-[132px] flex flex-row items-center cursor-pointer"
				onClick={open}
			>
				<Avatar className="w-[60px] h-[60px] mx-6">
					<AvatarImage src={avatar} alt="@shadcn" />
					<AvatarFallback>Avatar</AvatarFallback>
				</Avatar>
				<div className="flex flex-col w-[455px] overflow-x-hidden">
					<p className="text-xl line-clamp-1">{title}</p>
					<p className="text-gray-800 line-clamp-1">{description}</p>
				</div>
			</Card>
		</div>
	);
}

// export function EventCardPost(props: any) {
// 	const { setCurrentPage, event } = props;

// 	const close = () => setCurrentPage('');
// 	return (
// 		<motion.div
// 			className="bg-red-200 pl-16 pt-12"
// 			initial={{
// 				opacity: 0,
// 				width: '960px',
// 				height: '144px',
// 				borderRadius: '33px',
// 			}}
// 			animate={{
// 				opacity: 1,
// 				width: '1200px',
// 				height: '100%',
// 				minHeight: '720px',
// 				borderRadius: '60px',
// 			}}
// 			exit={{ opacity: 0, scale: 0, transition: { duration: 0.25 } }}
// 			transition={{ duration: 1.25, ease: 'easeIn' }}
// 		>
// 			<div className="flex flex-row">
// 				<h2 className="text-9xl basis-[95%]">{event?.title}</h2>
// 				<div className="bg-red-400 rounded-full w-12 h-12 mr-10" onClick={close}></div>
// 			</div>
// 			{event?.description}
// 		</motion.div>
// 	);
// }
