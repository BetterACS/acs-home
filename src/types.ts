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
	onChildClick: (id: number) => void;
}

interface SequentialComponentsProps<T> {
	node: React.ElementType;
	initialState: T[];
	parentStyle?: string;
	onChildClick?: (id: number) => void;
	emptyState: string;
}

export type { BodyComponentProps, EventCardProps, GroupComponentProps, SequentialComponentsProps, WebComponentProps };
