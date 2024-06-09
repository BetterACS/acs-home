import mongoose, { Document } from 'mongoose';
import { Bookmark, User } from './database/models';
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
	eventDependency: boolean;
	handleEventCallBack: () => void;
	queryTitleEvent: string;
	setQueryTitleEvent: (title: string) => void;
	setBookMarkDependency: (bookMarkDependency: boolean) => void;
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
	setCurrentPage: (page: string) => void;
}

interface GitHubRepoProps {
	id: string;
	title: string;
	fullName: string;
	avatar: string;
	description: string;
	language: string;
	stars: number;
	userID: mongoose.Types.ObjectId;
	userAvatar: string;
	onClick?: (_title: any, _description: any, _avatar: any, ref: any, _userAvatar: any) => void;
	bookmark_status:boolean,
	bookmark:Bookmark,
	userData: User;
	setBookMarkDependency: (bookMarkDependency: boolean) => void;
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
	user: User;
	// id: number;
	// title: string;
	// description: string;
	// githubLink: string;
}

interface EventCardPopupProps {
	avatar: string;
	name: string;
	title: string;
	description: string;
	setModalOpen: (modalOpen: boolean) => void;
	coin: number;
	due_date: number;
	postID: string;
	userData: User;
}

export type {
	EventCardPopupProps,
	EventModalInputProps,
	GitHubEventCardProps,
	GitHubRepoProps,
	TagInputProps,
	TagItem,
};

export type {
	BodyComponentProps,
	EventCardProps,
	GroupComponentProps,
	NavbarProps,
	SequentialComponentsProps,
	WebComponentProps,
};
