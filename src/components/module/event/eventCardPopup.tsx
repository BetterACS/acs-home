import { motion } from 'framer-motion';
import { useRef, forwardRef, useMemo } from 'react';
import Backdrop from '@/components/utils/backdrop';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { EventCardPopupProps } from '@/types';
import CommentsElement from '../comments/comments';

const EventCardPopup = forwardRef((props: EventCardPopupProps, ref: any) => {
	const { avatar, name, title, description, setModalOpen, coin, due_date, postID, userData, setCoinDependency: setMainCoinDependency, setCoinGithubDependency,user_id_foreign,isLoggedIn} = props;
	const windowSize = useMemo(
		() => (window.innerWidth > 1800 ? 1200 : Math.floor(window.innerWidth * 0.7)),
		[window.innerWidth]
	);

	return (
		<Backdrop onClick={() => {}}>
			<motion.div
				className="absolute border bg-card text-card-foreground shadow-sm my-2"
				initial={{
					position: 'absolute',
					zIndex: 60,
					top: ref.current?.getBoundingClientRect().top,
					left: ref.current?.getBoundingClientRect().left,

					width: '590px',
					height: '10%',
				}}
				animate={{
					width: windowSize + 'px',
					height: '80%',
					borderRadius: '20px',
					left: window.innerWidth / 2 - windowSize / 2 - 6, //#window.innerWidth / 2 - 606,
					top: '18%',
				}}
				exit={{ opacity: 0, scale: 0, transition: { duration: 0.25 } }}
				transition={{ duration: 0.45, ease: 'easeIn' }}
			>
				<div className="flex flex-col px-4 w-full h-full overflow-x-hidden overflow-y-auto">
					{/* Header */}
					<motion.div className="mt-24 mb-4 mx-32 flex flex-row justify-between items-center">
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

                    <motion.div className="px-32 flex flex-col w-full h-full">
                        <motion.p
                            className="mb-4"
                            initial={{ fontSize: '1.25rem' }}
                            animate={{ fontSize: '3rem' }}
                            transition={{ duration: 0.45 }}
                        >
                            {title}
                        </motion.p>

                        <motion.div className="flex flex-row space-x-4">
                            <motion.div className="flex flex-row items-center space-x-2 rounded-md border-2 pl-2 pr-1 py-1">
                                <p>{coin}</p>
                                <Image src={'/coin.gif'} alt="avatar" width={32} height={32} />
                            </motion.div>
                            <motion.div className="flex flex-row items-center space-x-2 rounded-md border-2 pl-2 pr-1 py-1">
                                <p>Close in:</p>
                                <p>{due_date.toString()} days</p>
                            </motion.div>
                        </motion.div>

                        <motion.div className="flex flex-col mt-16 text-xl text-gray-800">
                            <p>{description}</p>
                        </motion.div>

						<CommentsElement className="mt-8 pb-12" postID={postID} userData={userData} setCoinDependency={setMainCoinDependency} postCoin={coin} setCoinGithubDependency={setCoinGithubDependency} user_id_foreign={user_id_foreign} isLoggedIn={isLoggedIn}/>
					</motion.div>
				</div>
			</motion.div>
		</Backdrop>
	);
});

export default EventCardPopup;



