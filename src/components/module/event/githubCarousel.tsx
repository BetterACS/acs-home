import { Octokit } from 'octokit';
import { useEffect, useRef, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import GitHubEventCard from './githubEventCard';
import { GitHubRepoProps, GitHubEventCardProps } from '@/types';
import Backdrop from '@/components/utils/backdrop';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/database/models';
import { set } from 'mongoose';

const octokit = new Octokit();

// const sampleEvent = [
// 	{
// 		id: 1,
// 		title: 'Need help with GHT',
// 		description: 'We need help with GHT, a new project we are working on',
// 		githubLink: 'https://github.com/BetterACS/GHT',
// 	},
// 	{
// 		id: 2,
// 		title: 'Help with warmkid',
// 		description: 'We need help with warmkid, a new project we are working on',
// 		githubLink: 'https://github.com/BetterACS/warmkid',
// 	},
// ] as GitHubEventCardProps[];

export default function GitHubCarousel(props: any) {
	const { onCardClick } = props;
	//const { onCardClick } = props.onCardClick.clickPost;
	const [modalOpen, setModalOpen] = useState(false);

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [avatar, setAvatar] = useState('');
	const [name, setName] = useState('');
	const cardRef = useRef<any>();
	const [data, setData] = useState({} as User);

	async function LoaddataUser(_userID: string) {
		('use server');
		await fetch(`/api/trpc/getUserBy_id?input=${encodeURIComponent(JSON.stringify({ _id: _userID }))}`).then(
			async (res) => {
				const query = await res.json();
				const query_data = query.result.data.data.data as User;
				setData(query_data);
				setName(query_data.display_name);
				setAvatar(`https://cdn.discordapp.com/avatars/${query_data.discord_id}/${query_data.avatar}.png`);
				console.log("display_name",query_data.display_name, "_id",_userID)
			}
		);
	}

	const open = async (id: any, _title: any, _description: any, _avatar: any, ref: any,_userID:any) => {
		console.log('open', _userID);
		await LoaddataUser(_userID);
		setTitle(_title);
		setDescription(_description);
		cardRef.current = ref;
		setModalOpen(true);
		onCardClick(id);
	};

	const [event, setEvent] = useState<GitHubEventCardProps[]>([]);
	const [repos, setRepos] = useState<GitHubRepoProps[]>([]);
	const [repoIsLoading, setRepoIsLoading] = useState(true);
	const [isLoading, setIsLoading] = useState(true);

	async function Loaddata() {
		('use server');
		await fetch(`/api/trpc/getPost?input=${encodeURIComponent(JSON.stringify({ type: 'github_carousel' }))}`).then(
			async (res) => {
				const query = await res.json();
				const query_data = query.result.data.data.post;
				console.log('query_data', query_data);
				setEvent(query_data);
			}
		);
	}
	
	useEffect(() => {
		if (isLoading) {
		}
		const fetchData = async () => {
			await Loaddata();
			setIsLoading(false);
		};
		fetchData();
	}, []);

	useEffect(() => {
		if (!isLoading) {
			functionToCall();
		}
	}, [isLoading]);

	const functionToCall = async () => {
		const eventsArray = [] as GitHubRepoProps[];
		if (event) {
			await Promise.all(
				event.map(async (event) => {
					const link = event.githubLink.split('/');
					const { data } = await octokit.request('GET /repos/{owner}/{repo}', {
						owner: link[3],
						repo: link[4],
					});
					const repo = {
						id: event._id,
						title: event.title,
						fullName: data.full_name,
						avatar: data.owner.avatar_url,
						description: data.description,
						language: data.language,
						stars: data.stargazers_count,
						userID : event.user_id,
					} as GitHubRepoProps;
					eventsArray.push(repo);
				})
			);
			setRepos(eventsArray);
			setRepoIsLoading(false);
		}
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (repoIsLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			{modalOpen && (
				<Backdrop onClick={() => {}}>
					<motion.div
						className="absolute rounded-lg border bg-card text-card-foreground shadow-sm my-2"
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
			)}

			<Carousel className="w-[1200px] h-[318px] mx-[360px]">
				<CarouselContent className="w-[1200px] h-[318px]">
					{repos.map((repo: GitHubRepoProps) => (
						<CarouselItem key={repo.id} className="basis-1/3">
							<GitHubEventCard
								{...repo}
								onClick={(_title: any, _description: any, _avatar: any, ref: any) =>
									open(repo.id, _title, _description, _avatar, ref,repo.userID)
								}
							/>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</div>
	);
}
