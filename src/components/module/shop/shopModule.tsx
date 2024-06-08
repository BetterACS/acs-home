import React from 'react';
import { BentoGrid, BentoGridItem } from '@/components/ui/bentoGrid';
import {
	IconArrowWaveRightUp,
	IconBoxAlignRightFilled,
	IconBoxAlignTopLeft,
	IconClipboardCopy,
	IconFileBroken,
	IconSignature,
	IconTableColumn,
} from '@tabler/icons-react';

const Skeleton = () => (
	<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

const items = [
	{
		title: 'เสื้อ ACS Developer',
		description: 'เสื้อสำหรับนักพัฒนาโดยนักพัฒนา',
		header: <Skeleton />,
		icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
	},
	{
		title: 'คูปองคอร์สเรียนออนไลน์ 500 บาท',
		description: 'สนับสนุนค่าใช้จ่ายคอร์สเรียนออนไลน์ 500 บาท',
		header: <Skeleton />,
		icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
	},
	{
		title: 'แผ่นรองเมาส์ ACS',
		description: 'แผ่นรองเมาส์สุดเท่จาก ACS',
		header: <Skeleton />,
		icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
	},
	{
		title: 'หนังสือพัฒนาตนเอง',
		description: 'หนังสือสำหรับพัฒนาตัวเอง หรือหนังสือสำหรับโปรแกรมมิ่งและการออกแบบ',
		header: <Skeleton />,
		icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
	},
	{
		title: '1 Month Colab pro subscription',
		description: 'สิทธิ์ใช้งาน Colab pro 1 เดือน',
		header: <Skeleton />,
		icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
	},
	{
		title: 'Custom discord role',
		description: 'เปร่งประกายด้วยชื่อสีที่คุณต้องการในเซิฟเวอร์ ACS Common',
		header: <Skeleton />,
		icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
	},
	{
		title: 'พวงกุญแจ ACS',
		description: 'พวงกุญแจสุดเท่จาก ACS',
		header: <Skeleton />,
		icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
	},
];

export default function ShopModule() {
	return (
		<div className="mt-48">
			<BentoGrid className="max-w-4xl mx-auto">
				{items.map((item, i) => (
					<BentoGridItem
						key={i}
						title={item.title}
						description={item.description}
						header={item.header}
						icon={item.icon}
						className={i === 3 || i === 6 ? 'md:col-span-2' : ''}
					/>
				))}
			</BentoGrid>
		</div>
	);
}
