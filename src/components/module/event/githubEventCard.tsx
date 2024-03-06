import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import { GitHubRepoProps } from '@/types';
import clsx from 'clsx';

export default function GitHubEventCard(props: GitHubRepoProps) {
	const { title, fullName, avatar, description, language, stars } = props;

	return (
		<Card className="h-[318px] w-[381px] flex flex-col justify-evenly items-center">
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
	);
}
