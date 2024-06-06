import mongoose, { Document } from 'mongoose';
import { User } from './database/models';
interface GroupComponentProps {
	children: React.ReactNode;
}

interface EventCardProps extends Document {
	title: string;
	description?: string;
	created_at: Date;
	due_date?: Date;
	vote?: number;
	coin_reward?: number;
	type?: string;
	user_id: mongoose.Types.ObjectId;
	githubLink?: string;
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
	onClick?: (_title: any, _description: any, _avatar: any, ref: any) => void;
}

interface GitHubEventCardProps extends Document {
	title: string;
	description?: string;
	created_at: Date;
	due_date?: Date;
	vote?: number;
	coin_reward?: number;
	type?: string;
	user_id: mongoose.Types.ObjectId;
	githubLink: string;

	// id: number;
	// title: string;
	// description: string;
	// githubLink: string;
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
