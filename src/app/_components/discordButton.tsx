'use client';
import React from 'react'; // Import React when using JSX
import { trpc } from '../_trpc/client';

export default function DiscordButton() {
	
	return (
		<div>
			<img src="https://static-00.iconduck.com/assets.00/discord-icon-2048x2048-kva2hfax.png" onClick={()=>{console.log("discord button was clicked")}} />
		</div>
	);
}
