import { Octokit } from 'octokit';
import { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import GitHubEventCard from './githubEventCard';
import { GitHubRepoProps, GitHubEventCardProps } from '@/types';

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

export default function GitHubCarousel() {
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
						id: event.id,
						title: event.title,
						fullName: data.full_name,
						avatar: data.owner.avatar_url,
						description: data.description,
						language: data.language,
						stars: data.stargazers_count,
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
		<Carousel className="w-[1200px] h-[318px] mx-[360px]">
			<CarouselContent className="w-[1200px] h-[318px]">
				{repos.map((repo: GitHubRepoProps) => (
					<CarouselItem key={repo.id} className="basis-1/3">
						<GitHubEventCard {...repo} />
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
}
