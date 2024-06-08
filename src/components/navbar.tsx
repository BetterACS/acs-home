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
			{/* <Navbars className="top-2" /> */}
			{/* <p className="text-black dark:text-white">The Navbar will show on top of the page</p> */}
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
							<HoveredLink href="/web-dev">Web Development</HoveredLink>
							<HoveredLink href="/interface-design">Interface Design</HoveredLink>
							<HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
							<HoveredLink href="/branding">Branding</HoveredLink>
						</div>
					</MenuItem>
					<MenuItem
						setActive={setActive}
						active={active}
						item="Shop"
						onClick={() => {
							setCurrentPage('shop');
						}}
					>
						<div className="  text-sm grid grid-cols-2 gap-10 p-4">
							<ProductItem
								title="ACS Developer Shirt"
								href=""
								src="/shop_acsshirt.jpg"
								description="A shirt for developer by developer"
							/>
							<ProductItem
								title="Community Tools"
								href=""
								src="/shop_colab.jpg"
								description="Get the tools to help you in your project"
							/>
						</div>
					</MenuItem>
					{/* <MenuItem setActive={setActive} active={active} item="Abouts">
						<div className="flex flex-col space-y-4 text-sm">
							<HoveredLink href="/project">Projects</HoveredLink>
							<HoveredLink href="/teams">Teams</HoveredLink>
						</div>
					</MenuItem> */}
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
