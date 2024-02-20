'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function EventCard(props: any) {
	const { id, title, description, onChildClick } = props;

	return (
		<div>
			<motion.div
				className="flex flex-col bg-red-400 h-[144px] mx-[70px] rounded-[26px] my-[10px]"
				onClick={() => onChildClick(id)}
			>
				<h1>{title}</h1>
				{description}
			</motion.div>
		</div>
	);
}
