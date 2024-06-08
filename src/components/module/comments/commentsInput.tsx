import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';

function CommentInputTextArea({ onChange }: { onChange: (text: string) => void }) {
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const [value, setValue] = useState('');
	const [placeholder, setPlaceholder] = useState('Type your message here.');

	useEffect(() => {
		if (textAreaRef.current) {
			textAreaRef.current.style.overflow = 'hidden';
			textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
		}
	}, [value]);

	const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setValue(e.target.value);
		onChange(e.target.value);
	};

	const onFocus = () => {
		if (value === '') {
			setPlaceholder('');
		}
	};

	const onBlur = () => {
		if (value === '') {
			setPlaceholder('Type your message here.');
		}
	};

	return (
		<Textarea
			className="text-md focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-0"
			style={{ resize: 'none' }}
			ref={textAreaRef}
			placeholder={placeholder}
			value={value}
			onChange={handleOnChange}
			onFocus={onFocus}
			onBlur={onBlur}
		/>
	);
}

export default function CommentInput(props: any) {
	const { name, className } = props;
	const [value, setValue] = useState('');
	const [placeholder, setPlaceholder] = useState('Type your message here.');

	const handleOnChange = (value: string) => {
		console.log(value);
		setValue(value);
	};

	const onFocus = () => {
		if (value === '') {
			setPlaceholder('');
		}
	};

	const onBlur = () => {
		if (value === '') {
			setPlaceholder('Type your message here.');
		}
	};
	return (
		<div className="rounded-lg border-2 p-4">
			<div className="flex flex-row items-center space-x-2 mb-2">
				<div className="w-[32px] h-[32px] bg-blue-300 rounded-full"></div>
				<p>{name}</p>
			</div>
			<CommentInputTextArea onChange={handleOnChange} />
			<div className="w-full flex flex-row justify-endz">
				<Button className="" color="blue">
					Sent
				</Button>
			</div>
		</div>
	);
}
