import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import Image from 'next/image';

function CoinCard(props: any) {
	const { coin } = props;
	return (
		<div className="flex flex-row items-center space-x-2 border-2 border-gray-100 p-[5px] rounded-md hover:scale-[105%] cursor-pointer">
			<p>{coin}</p>
			<Image alt="coin" src="/coin.gif" width={20} height={20} />
		</div>
	);
}

function CoinInputCard(props: any) {
	return (
		<div className="flex flex-row items-center space-x-2 border-2 border-gray-100 p-[5px] rounded-md hover:scale-[105%] cursor-pointer">
			<input autoFocus type="number" className="w-[45px]" />
			<Image alt="coin" src="/coin.gif" width={20} height={20} />
		</div>
	);
}

export default function GiveCoinButton() {
	return (
		<HoverCard>
			<HoverCardTrigger className="py-[2px] px-[8px] text-sm border-2 rounded-md cursor-pointer">
				Give
			</HoverCardTrigger>
			<HoverCardContent>
				<div className="flex flex-row items-center space-x-2 justify-center">
					<CoinCard coin="5" />
					<CoinCard coin="25" />
					<CoinInputCard />
				</div>
			</HoverCardContent>
		</HoverCard>
	);
}
