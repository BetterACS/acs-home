'use client';

import { motion } from 'framer-motion';
import { Meteors } from '@/components/ui/meteors';
import Image from 'next/image';

import { PlaceholdersAndVanishInput } from '@/components/ui/placeholder';

export function PlaceholdersAndVanishInputDemo({
	setQueryTitleEvent,
	setQueryTitleCarousel,
}: {
	setQueryTitleEvent: (title: String) => void;
	setQueryTitleCarousel: (title: String) => void;
}) {
	const placeholders = [
		'Help me with my homework',
		'I need help with my project',
		'How to install a package in python?',
	];

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log('Typing in search box', e.target.value);
	};
	const onSubmit = (value: String) => {
		console.log('search', value);
		if (value == '') {
			setQueryTitleEvent('');
			setQueryTitleCarousel('');
			return;
		}

		setQueryTitleEvent(value);
		setQueryTitleCarousel(value);
	};
	return (
		<div className="flex flex-row items-center space-x-4 w-full jusitfy-stretch">
			<div className="rounded-full bg-blue-500 w-12 h-12 flex flex-col items-center justify-center">
				<Image src={'/search-white.gif'} alt="search-icon" width={30} height={30} className="bg-transparent" />
			</div>
			<PlaceholdersAndVanishInput placeholders={placeholders} onChange={handleChange} onSubmit={onSubmit} />
		</div>
	);
}

export default function SearchBox(props: any) {
	const { setModalOpen, setQueryTitleEvent, setQueryTitleCarousel } = props;
	return (
		<motion.div
			className="flex flex-row h-[104px] w-full justify-between items-center"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ scaleY: 0 }}
		>
			<button
				className="rounded-2xl text-2xl w-[360px] h-[84px] relative overflow-hidden border border-blue-500 bg-blue-500 text-white transition-all hover: transform hover:scale-105"
				onClick={setModalOpen}
			>
				<div className="relative z-10 flex flex-row items-center justify-center">
					<Image src={'/pencil.gif'} alt="search-icon" width={42} height={42} className="bg-transparent" />
					<p className="ml-[4px]">Create</p>
				</div>
				<Meteors className="bg-white" />
			</button>
			<div className="flex flex-row rounded-full bg-white p-2 items-center shadow-md w-[820px]">
				<PlaceholdersAndVanishInputDemo
					setQueryTitleEvent={setQueryTitleEvent}
					setQueryTitleCarousel={setQueryTitleCarousel}
				/>
			</div>
		</motion.div>
	);
}
