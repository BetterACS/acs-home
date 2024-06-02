'use client';
import { caller } from '@/server';
import { NavbarProps } from '@/types';
import { useEffect, useState } from 'react';
import { useCookies } from 'next-client-cookies';
import { set } from 'mongoose';
import { User } from '@/database/models';
import { HoveredLink, Menu, MenuItem, ProductItem } from '@/components/ui/navbar_menu';
import { cn } from '@/components/utils/ui';
import Image from 'next/image';

export default function Navbar({ isLoggedIn, data }: NavbarProps) {
	const redCircle = 'rounded-full w-[64px] h-[64px] bg-red-400 mx-4';
	const [active, setActive] = useState<string | null>(null);

	return (
		<div className="relative w-full flex items-center justify-center">
			{/* <Navbars className="top-2" /> */}
			{/* <p className="text-black dark:text-white">The Navbar will show on top of the page</p> */}
			<div className="fixed top-6 inset-x-0 max-w-xl mx-auto z-50 items-center">
				<Menu setActive={setActive}>
					<MenuItem setActive={setActive} active={active} item="Request">
						<div className="flex flex-col space-y-4 text-sm">
							<HoveredLink href="/web-dev">Web Development</HoveredLink>
							<HoveredLink href="/interface-design">Interface Design</HoveredLink>
							<HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
							<HoveredLink href="/branding">Branding</HoveredLink>
						</div>
					</MenuItem>
					<MenuItem setActive={setActive} active={active} item="Shop">
						{/* <div className="  text-sm grid grid-cols-2 gap-10 p-4">
							<ProductItem
								title="Algochurn"
								href="https://algochurn.com"
								src="https://assets.aceternity.com/demos/algochurn.webp"
								description="Prepare for tech interviews like never before."
							/>
							<ProductItem
								title="Tailwind Master Kit"
								href="https://tailwindmasterkit.com"
								src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
								description="Production ready Tailwind css components for your next project"
							/>
							<ProductItem
								title="Moonbeam"
								href="https://gomoonbeam.com"
								src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
								description="Never write from scratch again. Go from idea to blog in minutes."
							/>
							<ProductItem
								title="Rogue"
								href="https://userogue.com"
								src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
								description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
							/>
						</div> */}
					</MenuItem>
					<MenuItem setActive={setActive} active={active} item="Abouts">
						<div className="flex flex-col space-y-4 text-sm">
							<HoveredLink href="/project">Projects</HoveredLink>
							<HoveredLink href="/teams">Teams</HoveredLink>
						</div>
					</MenuItem>
					<div className="pl-6">
						{isLoggedIn ? (
							<div className="flex flex-row items-center">
								<p>{data.coin}</p>
								<Image
									src={'/coin.gif'}
									alt="search-icon"
									width={30}
									height={30}
									className="bg-transparent ml-2 mr-4"
									// style={{ backgroundColor: 'transparent' }}
								/>
								<img
									className="rounded-full w-[32px] h-[32px] bg-blue-400 ml-4 hover:w-[40px] hover:h-[40px] transition-all duration-300 ease-in-out"
									src={`https://cdn.discordapp.com/avatars/${data.discord_id}/${data.avatar}.png`}
									alt=""
								/>
								<p className="pl-2">{data.display_name}</p>
							</div>
						) : (
							// Render this when user is not logged in
							<div className="flex flex-row items-center">
								<div className={'rounded-full w-[32px] h-[32px] bg-blue-400 mx-4'}></div>
							</div>
						)}
					</div>
				</Menu>
			</div>
		</div>
	);
}
