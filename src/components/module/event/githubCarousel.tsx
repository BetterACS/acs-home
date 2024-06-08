import { Octokit } from 'octokit';

import { useEffect, useRef, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import GitHubEventCard from './githubEventCard';
import { GitHubRepoProps, GitHubEventCardProps } from '@/types';
import { User } from '@/database/models';
import EventCardPopup from './eventCardPopup';
import { LoadingTemplate } from '@/components/module/loading/loadingGithubCard';
const octokit = new Octokit();

export default function GitHubCarousel(props: any) {
	const { onCardClick, callBack, dependency, query_title_carousel } = props;
	const [modalOpen, setModalOpen] = useState(false);

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [avatar, setAvatar] = useState('');
	const [name, setName] = useState('');
	const cardRef = useRef<any>();
	const [data, setData] = useState({} as User);
	const [coin, setCoin] = useState(0);
	const [due_date, setDueDate] = useState(0); // tomorrow
	async function LoaddataUser(_userID: string) {
		('use server');
		await fetch(`/api/trpc/getUserBy_id?input=${encodeURIComponent(JSON.stringify({ _id: _userID }))}`).then(
			async (res) => {
				const query = await res.json();
				const query_data = query.result.data.data.data as User;
				setData(query_data);
				setName(query_data.display_name);
				setAvatar(`https://cdn.discordapp.com/avatars/${query_data.discord_id}/${query_data.avatar}.png`);
			}
		);
	}

	const open = async (
		id: any,
		_title: any,
		_description: any,
		_avatar: any,
		ref: any,
		_userID: any,
		coin: any,
		due_date: any
	) => {
		await LoaddataUser(_userID);
		setTitle(_title);
		setDescription(_description);
		cardRef.current = ref;
		setModalOpen(true);
		onCardClick(id);
		setCoin(coin);
		const dueDateTimestamp = new Date(due_date).getTime();
		const currentTimestamp = Date.now();
		const differenceInMilliseconds = dueDateTimestamp - currentTimestamp;
		setDueDate(Math.max(Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24)), 0));
	};

	const [event, setEvent] = useState<GitHubEventCardProps[]>([]);
	const [repos, setRepos] = useState<GitHubRepoProps[]>([]);
	const [repoIsLoading, setRepoIsLoading] = useState(true);
	const [isLoading, setIsLoading] = useState(true);

	async function Loaddata() {
		('use server');
		await fetch(
			`/api/trpc/getPost?input=${encodeURIComponent(
				JSON.stringify({ type: 'github_carousel', title: query_title_carousel })
			)}`
		).then(async (res) => {
			const query = await res.json();
			const query_data = query.result.data.data.post;
			console.log('query_data', query_data);
			setEvent(query_data);
		});
	}

	async function loadAllUserData(events: GitHubEventCardProps[]) {
		if (events === undefined) {
			return [];
		}
		if (events.length === 0) {
			return [];
		}
		const userPromises = events.map(async (event) => {
			const res = await fetch(
				`/api/trpc/getUserBy_id?input=${encodeURIComponent(JSON.stringify({ _id: event.user_id }))}`
			);
			const query = await res.json();
			return {
				...event,
				user: query.result.data.data.data as User,
			};
		});
		return Promise.all(userPromises);
	}

	const [eventsWithUserData, setEventsWithUserData] = useState([] as any[]);

	useEffect(() => {
		async function fetchData() {
			const data = await loadAllUserData(event);
			if (data.length > 0) {
				setEventsWithUserData(data);
				return;
			}

			setEventsWithUserData([404]);
		}
		fetchData();
	}, [event]);

	// useEffect(() => {
	// 	console.log('eventsWithUserData updated', eventsWithUserData);
	// }, [eventsWithUserData]);

	useEffect(() => {
		const fetchData = async () => {
			await Loaddata();
			setIsLoading(false);
			if (dependency === true) {
				callBack();
			}
		};
		fetchData();
	}, [dependency, query_title_carousel]);

	useEffect(() => {
		if (!isLoading && eventsWithUserData.length > 0) {
			functionToCall();
		}
	}, [isLoading, eventsWithUserData]);
	const functionToCall = async () => {
		const eventsArray = [] as GitHubRepoProps[];
		if (eventsWithUserData) {
			if (eventsWithUserData[0] === 404) {
				console.log('No events found');
				setRepos([]);
				setRepoIsLoading(false);
				setIsLoading(false);
				return;
			}
			await Promise.all(
				eventsWithUserData.map(async (event) => {
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
						userID: event.user_id,
						userAvatar: `https://cdn.discordapp.com/avatars/${event.user.discord_id}/${event.user.avatar}.png`,
					} as GitHubRepoProps;
					eventsArray.push(repo);
				})
			);
			setRepos(eventsArray);
			setRepoIsLoading(false);
			setIsLoading(false);
		}
	};

	if (
		repos.length === 0 &&
		eventsWithUserData.length === 1 &&
		!repoIsLoading &&
		!isLoading &&
		eventsWithUserData[0] === 404
	) {
		return <div className="text-lg text-white">No Github events found</div>;
	} else if (isLoading || repoIsLoading) {
		return <LoadingTemplate />;
	}

	return (
		<div>
			{modalOpen && (
				<EventCardPopup
					avatar={avatar}
					name={name}
					title={title}
					description={description}
					ref={cardRef}
					setModalOpen={setModalOpen}
					coin={coin}
					due_date={due_date}
				/>
			)}

			<Carousel className="w-[1200px] h-[318px] mx-[360px]">
				<CarouselContent className="w-[1200px] h-[318px]">
					{/* Display no events found if there are no events else display nothing */}
					{repos.map((repo: GitHubRepoProps, index: number) => (
						<CarouselItem key={repo.id} className="basis-1/3">
							<GitHubEventCard
								{...repo}
								onClick={(_title: any, _description: any, _avatar: any, ref: any) =>
									open(
										repo.id,
										_title,
										_description,
										_avatar,
										ref,
										repo.userID,
										eventsWithUserData[index].coin_reward,
										eventsWithUserData[index].due_date
									)
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
