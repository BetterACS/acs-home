'use client';
import { caller } from '@/server';
import { NavbarProps } from '@/types';
import { useEffect, useState } from 'react';
import { useCookies } from 'next-client-cookies';
import { set } from 'mongoose';
import { User } from '@/database/models';
export default function Navbar({ isLoggedIn, discordId }: NavbarProps) {
	const redCircle = 'rounded-full w-[64px] h-[64px] bg-red-400 mx-4';
	const [data, setData] = useState({} as User);
	const [isLoad, setIsLoad] = useState(false);
	async function Loaddata() {
		await fetch(`/api/trpc/getUser?input=${encodeURIComponent(JSON.stringify({ discord_id: discordId }))}`).then(
			async (res) => {
				const query = await res.json();
				const query_data = query.result.data.data.data as User;
				console.log(query_data);
				console.log(query_data.avatar);
				setData(query_data);
				setIsLoad(true);
			}
		);
	}

	useEffect(() => {
		const fetchData = async () => {
			console.log('useEffect is running');
			if (isLoggedIn) {
				console.log(isLoggedIn);
				await Loaddata();
				if (isLoad) {
					console.log(data);
				}
			}
		};
		fetchData();
	}, []);

	return (
		<div className="bg-green-200 sticky top-0 w-full h-[80px]">
			<div className="flex flex-row mx-[360px] justify-between">
				<div className="rounded-full w-[80px] h-[80px] bg-red-400"></div>
				<div className="flex flex-row">
					<div className="flex flex-row mx-8">
						<div className={redCircle}></div>
						<p>{data.display_name}</p>
						<p>{data.coin} coin</p>
					</div>
					{/* icon */}
					{isLoggedIn && isLoad ? (
						// Render this when user is logged in
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
