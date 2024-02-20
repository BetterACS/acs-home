import { WebComponentProps } from '../../types';

export default function Navbar(props: WebComponentProps) {
	const { currentPage } = props;

	return (
		<div className="bg-green-200 sticky top-0 w-full h-[80px]">
			<div className="flex flex-row mx-[360px] justify-between">
				{/* <h1>Icon</h1> */}
				<div className="rounded-full w-[80px] h-[80px] bg-red-400"></div>
				<div className="flex flex-row">
					<div className="flex flex-row mx-8">
						<div className="rounded-full w-[64px] h-[64px] bg-red-400 mr-4"></div>
						<p className="align-middle">200 coin</p>
					</div>
					<div className="rounded-full w-[64px] h-[64px] bg-red-400 mx-4"></div>
					<div className="rounded-full w-[64px] h-[64px] bg-red-400 mx-4"></div>
				</div>
			</div>
		</div>
	);
}
