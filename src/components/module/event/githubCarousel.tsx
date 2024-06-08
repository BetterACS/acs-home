import { Octokit } from 'octokit';
import { useEffect, useRef, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import GitHubEventCard from './githubEventCard';
import { GitHubRepoProps, GitHubEventCardProps } from '@/types';
import { User } from '@/database/models';
import EventCardPopup from './eventCardPopup';
const octokit = new Octokit();

export default function GitHubCarousel(props: any) {
	const { onCardClick } = props;
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

	const open = async (id: any, _title: any, _description: any, _avatar: any, ref: any, _userID: any) => {
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
						userID: event.user_id,
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
				<EventCardPopup
					avatar={avatar}
					name={name}
					title={title}
					description={description}
					ref={cardRef}
					setModalOpen={setModalOpen}
				/>
			)}

			<Carousel className="w-[1200px] h-[318px] mx-[360px]">
				<CarouselContent className="w-[1200px] h-[318px]">
					{repos.map((repo: GitHubRepoProps) => (
						<CarouselItem key={repo.id} className="basis-1/3">
							<GitHubEventCard
								{...repo}
								onClick={(_title: any, _description: any, _avatar: any, ref: any) =>
									open(repo.id, _title, _description, _avatar, ref, repo.userID)
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
