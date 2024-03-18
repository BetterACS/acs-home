'use client';
import { caller } from '@/server';
import { NavbarProps } from '@/types';
import { useEffect, useState } from 'react';
import { useCookies } from 'next-client-cookies';
import { set } from 'mongoose';
import { User } from '@/database/models';
export default function Navbar({ isLoggedIn, data }: NavbarProps) {
	const redCircle = 'rounded-full w-[64px] h-[64px] bg-red-400 mx-4';

	return (
		<div className="bg-green-200 sticky top-0 w-full h-[80px]">
			<div className="flex flex-row mx-[360px] justify-between">
				<div className="rounded-full w-[80px] h-[80px] bg-red-400"></div>
				<div className="flex flex-row">
					<div className="flex flex-row mx-8">
						<div className={redCircle}></div>
						{isLoggedIn ? (
							<>
								<p>{data.display_name}</p>
								<p>{data.coin} coin</p>
							</>
						) : (
							<p> plase login</p>
						)}
					</div>
					{/* icon */}
					{isLoggedIn ? (
						//<div>{data.avatar}</div>
						<img src={`https://cdn.discordapp.com/avatars/${data.discord_id}/${data.avatar}.png`} alt="" />
					) : (
						// Render this when user is not logged in
						<div className={'rounded-full w-[64px] h-[64px] bg-blue-400 mx-4'}></div>
					)}
					<div className={redCircle}></div>
				</div>
			</div>
		</div>
	);
}
