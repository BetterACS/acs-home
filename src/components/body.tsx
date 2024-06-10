'use client';

import { BodyComponentProps } from '@/types';
import EventModule from './module/event/eventModule';
import ShopModule from './module/shop/shopModule';
import { AnimatePresence } from 'framer-motion';
import { TypewriterEffectSmooth } from '@/components/ui/type-writer';

export function Logo() {
	const words = [
		{
			text: 'ACS',
		},
		{
			text: 'Home',
			className: 'text-blue-500 dark:text-blue-500',
		},
	];
	return (
		<div className="pt-[160px] pb-[40px] flex flex-col items-center justify-center">
			<p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
				Where community lives and grows
			</p>
			<TypewriterEffectSmooth words={words} />
		</div>
	);
}
export default function Body(props: BodyComponentProps) {
	const { currentPage, isLoggedIn } = props;
	return (
		<div>
			<Logo />
			<AnimatePresence initial={true} mode="wait" onExitComplete={() => null}>
				{(currentPage === '' || currentPage.includes('#event-')) && <EventModule {...props} />}
				{/* const {currentPage} = props; */}
				{currentPage.includes('shop') && (
					<ShopModule data={props.data} setCoinDependency={props.setCoinDependency} isLoggedIn={isLoggedIn} />
				)}
			</AnimatePresence>
		</div>
	);
}
