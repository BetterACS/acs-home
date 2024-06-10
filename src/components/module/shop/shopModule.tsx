import React, { useEffect, useState } from 'react';
import { cn } from '@/components/utils/ui';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { trpc } from '@/app/_trpc/client';
import { Item, User } from '@/database/models';
import Swal from 'sweetalert2';

const Skeleton = ({ src }: { src: string }) => (
	<div className="relative flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
		<img src={src} className="absolute inset-0 w-full h-full object-cover rounded-xl" />
	</div>
);

export default function ShopModule({
	data,
	isLoggedIn,
	setCoinDependency,
}: {
	data: User;
	isLoggedIn: boolean;
	setCoinDependency: (value: boolean) => void;
}) {
	const [items, setItems] = useState([] as Item[]);
	const query = trpc.getItem.useQuery();

	useEffect(() => {
		if (query.data) {
			const fetchedItems = query.data.data.data; // Adjust the path according to your response structure
			setItems(fetchedItems);
		}
	}, [query.data]);

	if (query.isLoading) {
		return <div>Loading...</div>;
	}

	if (query.isError) {
		return <div>Error loading items</div>;
	}

	return (
		<motion.div
			className="mt-8"
			initial={{ y: 600, opacity: 0 }}
			animate={{ y: 0, opacity: 1, transition: { duration: 1 } }}
			exit={{ translateY: 1000, opacity: 0, transition: { duration: 1.2 } }}
		>
			<BentoGrid className="max-w-4xl mx-auto">
				{items.map((item, i) => (
					<BentoGridItem
						key={item._id}
						itemKey={item._id} // Rename key to itemKey
						index={i}
						title={item.item_name}
						description={item.item_text}
						header={<Skeleton src={item.source} />}
						className={i === 3 || i === 6 ? 'md:col-span-2' : ''}
						coin={item.price}
						data={data}
						setCoinDependency={setCoinDependency}
						isLoggedIn={isLoggedIn}
						quantity={item.quantity}
					/>
				))}
			</BentoGrid>
		</motion.div>
	);
}

const BentoGrid = ({ className, children }: { className: string; children: React.ReactNode[] }) => {
	return (
		<div className={cn('grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ', className)}>
			{children}
		</div>
	);
};

const BentoGridItem = ({
	itemKey,
	className,
	index,
	title,
	description,
	header,
	coin,
	data,
	setCoinDependency,
	quantity,
	isLoggedIn,
}: {
	itemKey: string;
	className: string;
	index: number;
	title: string;
	description: string;
	header: React.ReactNode;
	coin: number;
	data: User;
	setCoinDependency: (value: boolean) => void;
	quantity:number;
	isLoggedIn: boolean;
}) => {
	const coinMutation = trpc.editUserCoin.useMutation({
		onSuccess: (data) => {
			console.log('editUserCoin success:', data);
			setCoinDependency(true);
		},
		onError: (error: any) => {
			console.error('Failed to update coin value:', error);
			alert('Failed to update coin value');
		},
		onSettled: () => {
			console.log('editUserCoin settled');
		},
	});

	const quantityMutation = trpc.editItem.useMutation({
		onSuccess: (data) => {
			console.log('editUserCoin success:', data);
		},
		onError: (error: any) => {
			console.error('Failed to update coin value:', error);
			alert('Failed to update coin value');
		},
		onSettled: () => {
			console.log('editUserCoin settled');
		},
	});

	const saveMutation = trpc.saveItem.useMutation({
		onSuccess: (data) => {
			console.log('editUserCoin success:', data);
		},
		onError: (error: any) => {
			console.error('Failed to update coin value:', error);
			alert('Failed to update coin value');
		},
		onSettled: () => {
			console.log('editUserCoin settled');
		},
	});

	const handleClick = async () => {
		if (!isLoggedIn) {
			Swal.fire('Oops...', 'You need to login to purchase items', 'error');
			return;
		}
		if (data.coin < coin) {
			Swal.fire('Oops...', 'Seems like you do not have enough coins', 'error');
			return;
		}
		const coinData = {
			_id: data._id,
			newCoinValue: data.coin - coin,
		};

		Swal.fire({
			title: 'Do you want to buy this item?',
			text: 'You will not be able to revert this!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, buy it for ' + coin + ' coins',
			cancelButtonText: 'No, cancel!',
		}).then(async (result) => {
			if (result.value) {
				Swal.fire('Bought!', 'Your item has been bought.', 'success');
				console.log('Sending coinData:', coinData);
				const coinResponse = await coinMutation.mutate(coinData);

		const quantityData = {
			_id: itemKey,
			quantity: quantity - 1,
		};
		const quantityResponse = await quantityMutation.mutate(quantityData);

		const SaveData = {
			user_id: data._id,
			item_id: itemKey,
		};
		const saveResponse = await saveMutation.mutate(SaveData);
			} else if (result.dismiss === Swal.DismissReason.cancel) {
				Swal.fire('Cancelled', '', 'error');
			}
		});
	};

	return (
		<div
			className={cn(
				'row-span-1 cursor-pointer hover:scale-[102%] rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4',
				className
			)}
			onClick={handleClick}
		>
			{header}
			<div className="group-hover/bento:translate-x-2 transition duration-200">
				<div className="flex flex-row items-center justify-between">
					<div className="flex flex-row items-center space-x-1">
						<p>{coin}</p>
						<Image alt={'Coin'} src={'/coin.gif'} height={20} width={20} />
					</div>
				</div>
				<div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">{title}</div>
				<div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
					{description}
				</div>
			</div>
		</div>
	);
};
