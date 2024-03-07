import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import Backdrop from '../../utils/backdrop';
import DatePicker from '../../utils/datepicker';
import type { TagItem } from '@/types';
import { caller } from '@/server';
import { trpc } from '../../../_trpc/client';
import { z } from 'zod';
import EventModalInput, { SelfExpandTextarea, TagInput } from './eventModalInput';
import { set } from 'mongoose';

const example_items: TagItem[] = [
	{ value: '1', label: 'One' },
	{ value: '2', label: 'Two' },
	{ value: '3', label: 'Three' },
];

const EventModal = ({ handleClose, data }: any) => {
	const [title, setTitle] = useState('' as string);
	const [dueDate, setDueDate] = useState<Date>(new Date(Date.now() + 24 * 60 * 60 * 1000)); // tomorrow
	const [coin, setCoin] = useState<number>(0);
	const [type, setType] = useState('');
	const [description, setDescription] = useState('');
	const [_id, setId] = useState('');
	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};

	const handleDueDateChange = (date: Date) => {
		setDueDate(new Date(date.getTime() + 7 * 60 * 60 * 1000)); // plus 7 hours for the date
	};

	const handleCoinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCoin(Number(e.target.value));
	};

	const handleTypeChange = (value: string) => {
		setType(value);
	};
	const handleDescriptionChange = (text: string) => {
		setDescription(text);
	};
	const mutation = trpc.post.useMutation({
		onSuccess: (data) => {
			//console.log('data:', data);
			//console.log('data.data._id:', data.data._id);
			setId(data.data._id);
			handleClose();
		},
		onError: (error) => {
			console.error('Error creating post:', error);
			alert('Failed to create post');
		},
		onSettled: () => {
			console.log('settled');
		},
	});
	const handleSubmit = async () => {
		const postData = {
			title: title,
			post_text: description,
			due_date: dueDate,
			coin_reward: coin,
			type: type,
			user_id: data._id,
		};
		//console.log('dueDate:', dueDate);
		//console.log('dueDate Type:', typeof dueDate);

		const response = await mutation.mutate(postData);
		console.log('response:', response);
	};

	return (
		<Backdrop onClick={handleClose}>
			<motion.div
				onClick={(e) => e.stopPropagation()}
				className="rounded-[34px] bg-white w-[968px] h-[688px]"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
			>
				<div
					className="flex flex-col w-full h-[85px] items-end"
					style={{ background: '#BEBEBE', borderRadius: '34px 34px 0 0' }}
				>
					<div className="m-4 rounded-full w-[48px] h-[48px] bg-gray-200" onClick={handleClose}></div>
				</div>

				<div className="flex flex-col items-center h-full" style={{ overflowY: 'auto', maxHeight: '560px' }}>
					<Input
						className="w-[747px] h-[78px] mt-[78px] text-4xl focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-0"
						style={{ background: '#E8E4E4' }}
						placeholder="Untitled"
						autoFocus
						value={title}
						onChange={handleTitleChange}
					/>

					<div className="self-start w-[480px] ml-[124px]">
						<EventModalInput label="Due date" marginTop={30} width={240} textSize="lg">
							<DatePicker onChange={handleDueDateChange} />
						</EventModalInput>

						<EventModalInput label="Coin" marginTop={20} width={240} textSize="lg">
							<Input className="w-[200px]" placeholder="100+" value={coin} onChange={handleCoinChange} />
						</EventModalInput>

						<EventModalInput label="Type" marginTop={20} width={240} textSize="lg">
							<TagInput message="Select item" items={example_items} onChange={handleTypeChange} />
						</EventModalInput>
					</div>

					<div className="w-[747px] mt-[40px] h-full">
						<SelfExpandTextarea onChange={handleDescriptionChange} />
					</div>
				</div>

				<button onClick={handleSubmit}>Submit</button>
			</motion.div>
		</Backdrop>
	);
};

export default EventModal;
