import React from 'react';
import { cn } from '@/components/utils/ui';

import {
	IconArrowWaveRightUp,
	IconBoxAlignRightFilled,
	IconBoxAlignTopLeft,
	IconClipboardCopy,
	IconFileBroken,
	IconSignature,
	IconTableColumn,
} from '@tabler/icons-react';

import Image from 'next/image';

const Skeleton = () => (
	<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

const items = [
	{
		title: 'เสื้อ ACS Developer',
		description: 'เสื้อสำหรับนักพัฒนาโดยนักพัฒนา',
		header: <Skeleton />,
		icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
		coin: 500,
	},
	{
		title: 'คูปองคอร์สเรียนออนไลน์ 500 บาท',
		description: 'สนับสนุนค่าใช้จ่ายคอร์สเรียนออนไลน์ 500 บาท',
		header: <Skeleton />,
		icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
		coin: 1000,
	},
	{
		title: 'แผ่นรองเมาส์ ACS',
		description: 'แผ่นรองเมาส์สุดเท่จาก ACS',
		header: <Skeleton />,
		icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
		coin: 200,
	},
	{
		title: 'หนังสือพัฒนาตนเอง',
		description: 'หนังสือสำหรับพัฒนาตัวเอง หรือหนังสือสำหรับโปรแกรมมิ่งและการออกแบบ',
		header: <Skeleton />,
		icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
		coin: 300,
	},
	{
		title: '1 Month Colab pro subscription',
		description: 'สิทธิ์ใช้งาน Colab pro 1 เดือน',
		header: <Skeleton />,
		icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
		coin: 350,
	},
	{
		title: 'Custom discord role',
		description: 'เปร่งประกายด้วยชื่อสีที่คุณต้องการในเซิฟเวอร์ ACS Common',
		header: <Skeleton />,
		icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
		coin: 2000,
	},
	{
		title: 'พวงกุญแจ ACS',
		description: 'พวงกุญแจสุดเท่จาก ACS',
		header: <Skeleton />,
		icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
		coin: 100,
	},
];

export default function ShopModule() {
	return (
		<div className="mt-24">
			<BentoGrid className="max-w-4xl mx-auto">
				{items.map((item, i) => (
					<BentoGridItem
						key={i}
						title={item.title}
						description={item.description}
						header={item.header}
						icon={item.icon}
						className={i === 3 || i === 6 ? 'md:col-span-2' : ''}
						coin={item.coin}
					/>
				))}
			</BentoGrid>
		</div>
	);
}

const BentoGrid = (props: any) => {
	const { className, children, coin } = props;

	return (
		<div className={cn('grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ', className)}>
			{children}
		</div>
	);
};

const BentoGridItem = ({
	className,
	title,
	description,
	header,
	icon,
	coin,
}: {
	className?: string;
	title?: string | React.ReactNode;
	description?: string | React.ReactNode;
	header?: React.ReactNode;
	icon?: React.ReactNode;
	coin?: number;
}) => {
	return (
		<div
			className={cn(
				'row-span-1 cursor-pointer hover:scale-[102%] rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4',
				className
			)}
		>
			{header}
			<div className="group-hover/bento:translate-x-2 transition duration-200">
				<div className="flex flex-row items-center justify-between">
					<p>{icon}</p>
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
