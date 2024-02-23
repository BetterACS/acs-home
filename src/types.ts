interface GroupComponentProps {
	children: React.ReactNode;
}

interface EventCardProps {
	id: number;
	title: string;
	description: string;
	dueDate: string;
}

interface WebComponentProps {
	currentPage: string;
	setCurrentPage: (page: string) => void;
}

interface BodyComponentProps extends WebComponentProps {
	events: EventCardProps[];
	setEvents: (events: EventCardProps[]) => void;
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
	textSize: string;
}

export type { EventModalInputProps, TagInputProps, TagItem };

export type { BodyComponentProps, EventCardProps, GroupComponentProps, SequentialComponentsProps, WebComponentProps };
