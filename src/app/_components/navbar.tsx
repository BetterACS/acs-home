'use client';

export default function Navbar() {
	const redCircle = 'rounded-full w-[64px] h-[64px] bg-red-400 mx-4';

	return (
		<div className="bg-green-200 sticky top-0 w-full h-[80px]">
			<div className="flex flex-row mx-[360px] justify-between">
				<div className="rounded-full w-[80px] h-[80px] bg-red-400"></div>
				<div className="flex flex-row">
					<div className="flex flex-row mx-8">
						<div className={redCircle}></div>
						<p>200 coin</p>
					</div>
					<div className={redCircle}></div>
					<div className={redCircle}></div>
				</div>
			</div>
		</div>
	);
}