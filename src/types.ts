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
}

interface SequentialComponentsProps<T> {
	node: React.ElementType;
	initialState: T[];
	parentStyle?: string;
	onChildClick?: (id: number) => void;
	emptyState: string;
}

export type { BodyComponentProps, EventCardProps, GroupComponentProps, SequentialComponentsProps, WebComponentProps };
