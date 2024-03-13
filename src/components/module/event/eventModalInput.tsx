import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { TagInputProps, EventModalInputProps } from '@/types';

export function SelfExpandTextarea() {
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
			className="focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-0"
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

export function TagInput(props: TagInputProps) {
	const { items, message } = props;
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState('');

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
					{value ? items.find((item) => item.value === value)?.label : message}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput placeholder={message} />
					<CommandEmpty>No items found....</CommandEmpty>
					<CommandGroup>
						{items.map((item) => (
							<CommandItem
								key={item.value}
								value={item.value}
								onSelect={(currentValue: any) => {
									setValue(currentValue === value ? '' : currentValue);
									setOpen(false);
								}}
							>
								<Check
									className={cn('mr-2 h-4 w-4', value === item.value ? 'opacity-100' : 'opacity-0')}
								/>
								{item.label}
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
}

export default function EventModalInput(props: EventModalInputProps) {
	const { children, label, marginTop, width, textSize } = props;

	return (
		<div className={`w-full mt-[${marginTop}px] flex flex-row items-center`}>
			<Label className={`text-${textSize}} w-[${width}px]`} htmlFor="title">
				{label}
			</Label>
			{children}
		</div>
	);
}
