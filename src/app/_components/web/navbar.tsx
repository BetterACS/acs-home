import { WebComponentProps } from '../../../types';

export default function Navbar(props: WebComponentProps) {
	const { currentPage } = props;

	return (
		<div className="flex flex-row bg-green-200 sticky top-0 w-full h-[80px]">
			<h1>Navbar</h1>
		</div>
	);
}
