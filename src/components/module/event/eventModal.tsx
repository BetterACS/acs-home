import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import Backdrop from '../../utils/backdrop';
import DatePicker from '../../utils/datepicker';
import type { TagItem } from '@/types';
import { caller } from '@/server';
import { trpc } from '@/app/_trpc/client';
import { z } from 'zod';
import EventModalInput, { SelfExpandTextarea, TagInput } from './eventModalInput';
import { Button } from '@/components/ui/button';
import { CalendarDays, Coins, Github, X, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Swal from 'sweetalert2';

const example_items: TagItem[] = [
	{ value: '1', label: 'One' },
	{ value: '2', label: 'Two' },
	{ value: '3', label: 'Three' },
];

const EventModal = ({ handleClose, data, carouselCallBack, eventCallBack, setCoinDependency }: any) => {
	const [title, setTitle] = useState('' as string);
	const [dueDate, setDueDate] = useState<Date>(new Date(Date.now() + 24 * 60 * 60 * 1000)); // tomorrow
	const [coin, setCoin] = useState<number>(0);
	const [type, setType] = useState('event_card');
	const [description, setDescription] = useState('');
	const [_id, setId] = useState('');
	const [github, setGithub] = useState('');
	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log('e.target.value:', e.target.value);
		setTitle(e.target.value);
	};

	const handleDueDateChange = (date: Date) => {
		setDueDate(new Date(date.getTime() + 7 * 60 * 60 * 1000)); // plus 7 hours for the date
		console.log('dueDate:', dueDate);
	};

	const handleCoinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCoin(Number(e.target.value));
		console.log('coin:', e.target.value);
	};

	const handleTypeChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		setGithub(event.target.value);
		if (event.target.value !== '') {
			setType('github_carousel');
		} else {
			setType('event_card');
		}
	};
	const handleDescriptionChange = (text: string) => {
		setDescription(text);
		console.log('description:', description);
	};

	const coinMutation = trpc.editUserCoin.useMutation({
		onSuccess: (data) => {
			setCoinDependency(true);
		},
		onError: (error: any) => {
			console.error('Error creating post:', error);
			// alert('Failed to create post');
			Swal.fire({
				icon: 'error',
				title: 'Failed to create post',
			});
		},
		onSettled: () => {
			console.log('settled');
		},
	});

	const mutation = trpc.post.useMutation({
		onSuccess: async (data) => {
			console.log('data:', data);
			console.log('data.data._id:', data.data._id);
			setId(data.data._id);
			handleClose();
			if (type !== 'event_card') {
				carouselCallBack();
			} else {
				eventCallBack();
			}
		},
		onError: (error: any) => {
			console.error('Error creating post:', error);
			Swal.fire({
				icon: 'error',
				title: 'Failed to create post',
			});
		},
		onSettled: () => {
			console.log('settled');
		},
	});
	const handleSubmit = async () => {
		const currentCoin = data.coin;
		if (currentCoin < coin) {
			Swal.fire({
				icon: 'error',
				title: 'Failed to create post',
				text: 'You do not have enough coins',
			});
			return;
		}
		const postData = {
			title: title,
			description: description,
			due_date: dueDate,
			coin_reward: coin,
			type: type,
			user_id: data._id,
			githubLink: github,
		};
		console.log('dueDate:', dueDate);
		console.log('dueDate Type:', typeof dueDate);

		const response = await mutation.mutate(postData);

		const coinData = {
			_id: data._id,
			newCoinValue: currentCoin - coin,
		};

		const coinResponse = await coinMutation.mutate(coinData);
	};

	return (
		<Backdrop onClick={handleClose}>
			<motion.div
				onClick={(e) => e.stopPropagation()}
				className="rounded-[16px] bg-white w-[968px] h-[700px]"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
			>
				<div className="flex flex-row items-center m-6 justify-end">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<Info size={30} />
							</TooltipTrigger>
							<TooltipContent>
								<p>Create a request and let the community help you with your project.</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					<X className="ml-2 hover:scale-110 cursor-pointer" size={38} onClick={handleClose} />
				</div>

				<div className="flex flex-col items-center h-full" style={{ overflowY: 'auto', maxHeight: '560px' }}>
					<Input
						className="w-[700px] h-[78px] mt-[8px] text-4xl focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-0"
						style={{ background: '#E8E4E4' }}
						placeholder="Untitled"
						autoFocus
						value={title}
						onChange={handleTitleChange}
					/>

					<div className="self-start w-[433px] ml-[156px]">
						<EventModalInput label="Due date" marginTop={30} width={200} icon={<CalendarDays />}>
							<DatePicker onChange={handleDueDateChange} />
						</EventModalInput>

						<EventModalInput label="Coin" marginTop={16} width={200} icon={<Coins />}>
							<Input className="w-[200px]" placeholder="100+" value={coin} onChange={handleCoinChange} />
						</EventModalInput>

						<EventModalInput label="Github repo" marginTop={16} width={200} icon={<Github />}>
							<Input
								className="w-[200px]"
								placeholder="owner / repository"
								// message="Select item"
								// items={example_items}
								onChange={handleTypeChange}
							/>
						</EventModalInput>
					</div>

					<div className="w-[700px] mt-[40px] h-full">
						<SelfExpandTextarea onChange={handleDescriptionChange} />
					</div>
				</div>
				<center>
					<Button
						onClick={handleSubmit}
						className="text-lg bg-blue-600 hover:bg-blue-500 transition-all duration-200 hover:shadow-xl hover:scale-105"
					>
						Create
					</Button>
				</center>
			</motion.div>
		</Backdrop>
	);
};

export default EventModal;
