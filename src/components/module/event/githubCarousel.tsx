// import * as React from 'react';
import { Octokit } from 'octokit';
import { use, useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import clsx from 'clsx';
import GitHubEventCard from './githubEventCard';
import { GitHubRepoProps, GitHubEventCardProps } from '@/types';
const octokit = new Octokit();

const sampleEvent = [
	{
		id: 1,
		title: 'Need help with GHT',
		description: 'We need help with GHT, a new project we are working on',
		githubLink: 'https://github.com/BetterACS/GHT',
	},
	{
		id: 2,
		title: 'Help with warmkid',
		description: 'We need help with warmkid, a new project we are working on',
		githubLink: 'https://github.com/BetterACS/warmkid',
	},
	{
		id: 3,
		title: 'How to fine-tune a model in PyTorch',
		description: 'We need help with Violence Detection, a new project we are working on',
		githubLink: 'https://github.com/monshinawatra/ViolenceDetection',
	},
	{
		id: 4,
		title: 'Help Mr. Narutchai with his project',
		description: 'We need help with Project MN, a new project we are working on',
		githubLink: 'https://github.com/Narutchai01/Project_MN',
	},
] as GitHubEventCardProps[];

export default function GitHubCarousel() {
	const [event, setEvent] = useState<GitHubEventCardProps[]>(sampleEvent);
	const [repos, setRepos] = useState<GitHubRepoProps[]>([]);
	const [repoIsLoading, setRepoIsLoading] = useState(true);

	const functionToCall = async () => {
		const eventsArray = [] as GitHubRepoProps[];
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
			setRepos([...eventsArray, repo]);
			eventsArray.push(repo);
		});
		setRepoIsLoading(false);
	};
	useEffect(() => {
		functionToCall();
	}, []);

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
