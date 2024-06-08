'use client';
import { caller } from '@/server';
import { NavbarProps } from '@/types';
import { useEffect, useState } from 'react';
import { useCookies } from 'next-client-cookies';
import { set } from 'mongoose';
import { User } from '@/database/models';
import { HoveredLink, Menu, MenuItem, ProductItem } from '@/components/ui/navbar_menu';
import Image from 'next/image';

export default function Navbar({ isLoggedIn, data, setCurrentPage }: NavbarProps) {
	const [active, setActive] = useState<string | null>(null);
	const DISCORD_API = process.env.DISCORD_API || '';

	function handleClick() {
		console.log('This button was clicked');
		window.location.assign(DISCORD_API);
	}

	return (
		<div className="relative w-full flex items-center justify-center">
			<div className="fixed top-6 inset-x-0 max-w-md mx-auto z-50 items-center">
				<Menu setActive={setActive}>
					<MenuItem
						setActive={setActive}
						active={active}
						item="Request"
						onClick={() => {
							setCurrentPage('');
						}}
					>
						<div className="flex flex-col space-y-4 text-sm">
							<HoveredLink href="/web-dev">+ Create</HoveredLink>
						</div>
					</MenuItem>

					<div className="cursor-pointer" onClick={() => setCurrentPage('shop')}>
						Shop
					</div>
					<div className="pl-6">
						{isLoggedIn ? (
							<div className="flex flex-row items-center ">
								<p>{data.coin}</p>
								<Image
									src={'/coin.gif'}
									alt="search-icon"
									width={30}
									height={30}
									className="bg-transparent ml-2 mr-4"
								/>
								<div className="flex flex-row items-center hover:scale-[120%] transition-all duration-300 ease-in-out">
									<img
										className="rounded-full w-[32px] h-[32px] bg-blue-400 ml-4"
										src={`https://cdn.discordapp.com/avatars/${data.discord_id}/${data.avatar}.png`}
										alt=""
									/>
									<p className="pl-2">{data.display_name}</p>
								</div>
							</div>
						) : (
							<div
								className="flex flex-row items-center space-x-2 cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out"
								onClick={handleClick}
							>
								<Image priority src="/discord.svg" height={32} width={32} alt="Sign in" />
								<p>Sign in</p>
							</div>
						)}
					</div>
				</Menu>
			</div>
		</div>
	);
}
