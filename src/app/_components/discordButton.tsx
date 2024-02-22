'use client';
import React from 'react'; // Import React when using JSX
import { useRouter } from 'next/router';

function DiscordButton() {
    const DISCORD_API = process.env.DISCORD_API || '';
    
	function handleClick() {
		console.log('This button was clicked');
		window.location.href = DISCORD_API;
	}
    return (
        <div>
			<img src="https://static-00.iconduck.com/assets.00/discord-icon-2048x2048-kva2hfax.png" onClick={handleClick}/>
        </div>
    );
}
export default DiscordButton;
