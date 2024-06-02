import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import { GitHubRepoProps } from '@/types';
import clsx from 'clsx';
import { useState, useRef } from 'react';
import Backdrop from '@/components/utils/backdrop';
import { motion } from 'framer-motion';
import Image from 'next/image';
export default function GitHubEventCard(props: GitHubRepoProps) {
	const { title, fullName, avatar, description, language, stars } = props;
	const cardRef = useRef<any>();
	const [modalOpen, setModalOpen] = useState(false);
	const open = () => {
		setModalOpen(true);
	};

	return (
		<>
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
									<p>{fullName}</p>
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
									<h3>{title}</h3>
									<p>{description}</p>
								</motion.p>
								<motion.p className="mx-24 text-gray-800">{description}</motion.p>
							</motion.div>
						</div>
					</motion.div>
				</Backdrop>
			)}
			<Card
				onClick={open}
				className="cursor-pointer scale-[98%] hover:scale-100 h-[318px] w-[381px] flex flex-col justify-evenly items-center drop-shadow-lg"
			>
				<div className="flex flex-row w-[320px]">
					<Avatar className="w-[38px] h-[38px] mr-4 mt-2">
						<AvatarImage src={avatar} alt="@shadcn" />
						<AvatarFallback>Avatar</AvatarFallback>
					</Avatar>
					<div>
						<p className="text-2xl font-bold">{title}</p>
					</div>
				</div>
				<Card className="h-[170px] w-[320px] flex flex-col justify-between p-4">
					<div className="flex flex-row justify-between">
						<div className="mr-4 mt-2 w-[200px]">
							<p className="text-[1.25rem] break-words ...">{fullName}</p>
							<p
								className={clsx(
									'text-sm line-clamp-3 w-[200px] pt-[2px]',
									description ? 'text-gray-600' : 'text-gray-400'
								)}
							>
								{description ? description : 'No description'}
							</p>
						</div>
						<Avatar className="w-[64px] h-[64px] rounded-lg">
							<AvatarImage src={avatar} alt="@shadcn" />
							<AvatarFallback>Icon</AvatarFallback>
						</Avatar>
					</div>
					<div className="flex flex-row">
						<Badge variant="outline" className="h-8 flex flex-row justify-center">
							<Star strokeWidth={2} size={20} />
							<p className="pl-2">{stars}</p>
						</Badge>
						<div className="pl-2">
							<Badge color="red">{language}</Badge>
						</div>
					</div>
				</Card>
			</Card>
		</>
	);
}
