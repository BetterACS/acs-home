import { User } from './database/models';

interface GroupComponentProps {
	children: React.ReactNode;
}

interface EventCardProps {
	id: number;
	title: string;
	description: string;
}

interface WebComponentProps {
	currentPage: string;
	setCurrentPage: (page: string) => void;
}

interface BodyComponentProps extends WebComponentProps {
	events: EventCardProps[];
	setEvents: (events: EventCardProps[]) => void;
	isLoggedIn: boolean;
	data: User;
}

interface SequentialComponentsProps<T> {
	node: React.ElementType;
	initialState: T[];
	parentStyle?: string;
	onChildClick?: (id: number) => void;
	emptyState: string;
}

interface TagItem {
	value: string;
	label: string;
}

interface TagInputProps {
	items: TagItem[];
	message: string;
}

interface EventModalInputProps {
	children: React.ReactElement;
	label: string;
	marginTop: number;
	width: number;
	icon?: React.ReactElement;
}
interface NavbarProps {
	isLoggedIn: boolean;
	data: User;
}

interface GitHubRepoProps {
	id: number;
	title: string;
	fullName: string;
	avatar: string;
	description: string;
	language: string;
	stars: number;
}

interface GitHubEventCardProps {
	id: number;
	title: string;
	description: string;
	githubLink: string;
}

export type { EventModalInputProps, GitHubEventCardProps, GitHubRepoProps, TagInputProps, TagItem };

export type {
	BodyComponentProps,
	EventCardProps,
	GroupComponentProps,
	NavbarProps,
	SequentialComponentsProps,
	WebComponentProps,
};
