'use client';

import { motion } from 'framer-motion';
import { Meteors } from '@/components/ui/meteors';
import { Search } from 'lucide-react';
// import logo from '../assets/search.gif';
import Image from 'next/image';

interface MultiFunctionButtonProps {
	children: React.ReactNode;
	width: number;
	icon?: React.ReactNode;
	onClick?: () => void;
}

function MultiFunctionButton(props: MultiFunctionButtonProps) {
	const { children, width, icon, onClick } = props;
	return (
		<div className="relative bg-red-200 rounded-[33px] overflow-hidden" style={{ width: width }} onClick={onClick}>
			{children}
		</div>
	);
}

export default function SearchBox(props: any) {
	const { setModalOpen } = props;
	return (
		<motion.div
			className="flex flex-row h-[104px] w-full justify-between items-center"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ scaleY: 0 }}
		>
			<button
				className="rounded-2xl text-2xl w-[477px] h-[104px] relative overflow-hidden border border-blue-500 bg-blue-500 text-white transition-all hover: transform hover:scale-105"
				onClick={setModalOpen}
			>
				<div className="relative z-10 flex flex-row items-center justify-center">
					<Image src={'/pencil.gif'} alt="search-icon" width={42} height={42} className="bg-transparent" />
					<p className="ml-[4px]">Create</p>
				</div>
				<Meteors className="bg-white" />
			</button>

			{/* <MultiFunctionButton width={477} onClick={setModalOpen}>
				<p>Create</p>
			</MultiFunctionButton> */}
			{/* <MultiFunctionButton width={685}>
				<p>Search</p>
			</MultiFunctionButton> */}
			<div className="w-[685px] rounded-full bg-gray-200 p-2 flex flex-row items-center ">
				<div className="rounded-full bg-blue-500 w-12 h-12 flex flex-col items-center justify-center">
					{/* <Search size={26} color="white" /> */}
					{/* <img src={logo} alt="" /> */}
					<Image
						src={'/search-white.gif'}
						alt="search-icon"
						width={30}
						height={30}
						className="bg-transparent"
					/>
				</div>
				<input
					type="text"
					className="ml-2 w-[580px] h-full text-2xl bg-gray-200 focus:outline-0"
					placeholder="Search"
				/>
			</div>
		</motion.div>
	);
}
