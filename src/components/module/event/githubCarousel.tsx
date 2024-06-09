import { Octokit } from 'octokit';

import { useEffect, useRef, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import GitHubEventCard from './githubEventCard';
import { GitHubRepoProps, GitHubEventCardProps } from '@/types';
import { Bookmark, User } from '@/database/models';
import EventCardPopup from './eventCardPopup';
import { LoadingTemplate } from '@/components/module/loading/loadingGithubCard';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import Link from 'next/link';
const octokit = new Octokit();

export default function GitHubCarousel(props: any) {
	const { onCardClick, callBack, dependency, query_title_carousel, userData } = props;
	const [modalOpen, setModalOpen] = useState(false);

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState<any>('');
	const [avatar, setAvatar] = useState('');
	const [name, setName] = useState('');
	const cardRef = useRef<any>();
	const [data, setData] = useState({} as User);
	const [coin, setCoin] = useState(0);
	const [due_date, setDueDate] = useState(0); // tomorrow
	const [postID, setPostID] = useState('');
	const [repoGitHub, setRepoGitHub] = useState('');

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
		userDescription: any,
		githubAvatar: any,
		_avatar: any,
		ref: any,
		_userID: any,
		coin: any,
		due_date: any
	) => {
		await LoaddataUser(_userID);
		setTitle(_title);
		setDescription(
			<div>
				{userDescription}
				<Link href={`https://github.com/${_description}`}>
					<Card
						className="mt-4 hover:scale-[105%] cursor-pointer h-[100px] w-[320px] flex flex-col justify-between p-4"
						// onClick={}
					>
						<div className="flex flex-row justify-between">
							<div className="mr-4 mt-2 w-[200px]">
								<p className="text-[1.25rem] break-words ...">{_description}</p>
							</div>
							<Avatar className="w-[64px] h-[64px] rounded-lg">
								<AvatarImage src={githubAvatar} alt="@shadcn" />
								<AvatarFallback>Icon</AvatarFallback>
							</Avatar>
						</div>
					</Card>
				</Link>
			</div>
		);
		// setRepoGitHub()
		cardRef.current = ref;
		setModalOpen(true);
		onCardClick(id);
		setCoin(coin);
		const dueDateTimestamp = new Date(due_date).getTime();
		const currentTimestamp = Date.now();
		const differenceInMilliseconds = dueDateTimestamp - currentTimestamp;
		setDueDate(Math.max(Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24)), 0));
		setPostID(id);
	};

	const [event, setEvent] = useState<GitHubEventCardProps[]>([]);
	const [repos, setRepos] = useState<GitHubRepoProps[]>([]);
	const [repoIsLoading, setRepoIsLoading] = useState(true);
	const [isLoading, setIsLoading] = useState(true);
	const [bookMarkDependency, setBookMarkDependency] = useState(false);
	async function Loaddata() {
		('use server');
		await fetch(
			`/api/trpc/getPost?input=${encodeURIComponent(
				JSON.stringify({ type: 'github_carousel', title: query_title_carousel, user_id: userData._id })
			)}`
		).then(async (res) => {
			const query = await res.json();
			const query_data = query.result.data.data.post;
			console.log('query_data_new_carousel', query_data);
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
			const bookmarkRes = await fetch(
				`/api/trpc/getBookMark?input=${encodeURIComponent(
					JSON.stringify({ post_id: event._id, user_id: userData._id, type: 'github_carousel' })
				)}`
			);
			const bookmarkQuery = await bookmarkRes.json();
			return {
				...event,
				user: query.result.data.data.data as User,
				bookmark_status: bookmarkQuery.result.data.status === 200 ? true : false,
				bookmark: bookmarkQuery.result.data.data.bookmark as Bookmark,
			};
		});
		return Promise.all(userPromises);
	}

	const [eventsWithUserData, setEventsWithUserData] = useState([] as any[]);

	useEffect(() => {
		async function fetchData() {
			const data = await loadAllUserData(event);

			if (data.length > 0) {
				// Sort data by title
				const sortedData = data.sort((a, b) => {
					if (a.title < b.title) return -1;
					if (a.title > b.title) return 1;
					return 0;
				});

				setEventsWithUserData(sortedData);
				console.log('sortedData', sortedData);
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
			setBookMarkDependency(false);
		};
		fetchData();
	}, [dependency, query_title_carousel, bookMarkDependency]);

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
						userDescription: event.description,
						language: data.language,
						stars: data.stargazers_count,
						userID: event.user_id,
						userAvatar: `https://cdn.discordapp.com/avatars/${event.user.discord_id}/${event.user.avatar}.png`,
						bookmark_status: event.bookmark_status,
						bookmark: event.bookmark,
						userData: userData,
						setBookMarkDependency: setBookMarkDependency,
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
					postID={postID}
					userData={userData}
				/>
			)}

			<Carousel className="w-[1200px] h-[318px] mx-[360px]">
				<CarouselContent className="w-[1200px] h-[318px]">
					{/* Display no events found if there are no events else display nothing */}
					{repos.map((repo: GitHubRepoProps, index: number) => (
						<CarouselItem key={repo.id} className="basis-1/3">
							<GitHubEventCard
								{...repo}
								onClick={(_title: any, _description: any, _avatar: any, ref: any) => {
									open(
										repo.id,
										_title,
										repo.fullName,
										repo.userDescription,
										repo.avatar,
										_avatar,
										ref,
										repo.userID,
										eventsWithUserData[index].coin_reward,
										eventsWithUserData[index].due_date
									);
									// setRepoGitHubDescription(repo.fullName);
								}}
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
