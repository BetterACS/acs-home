import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

export default function DatePicker({ onChange }: { onChange: (date: Date) => void }) {
	const [date, setDate] = useState<Date>();

	const handleDateSelect = (selectedDate: Date | undefined) => {
		if (selectedDate) {
			setDate(selectedDate);
			onChange(selectedDate);
		}
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={'outline'}
					className={cn('w-[200px] justify-start text-left font-normal', !date && 'text-muted-foreground')}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{date ? format(date, 'PPP') : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar mode="single" selected={date} onSelect={handleDateSelect} initialFocus />
			</PopoverContent>
		</Popover>
	);
}

// export default function DatePicker() {
// 	const [date, setDate] = useState<Date>();

// 	return (
// 		<Popover>
// 			<PopoverTrigger asChild>
// 				<Button
// 					variant={'outline'}
// 					className={cn('w-[200px] justify-start text-left font-normal', !date && 'text-muted-foreground')}
// 				>
// 					<CalendarIcon className="mr-2 h-4 w-4" />
// 					{date ? format(date, 'PPP') : <span>Pick a date</span>}
// 				</Button>
// 			</PopoverTrigger>
// 			<PopoverContent className="w-auto p-0">
// 				<Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
// 			</PopoverContent>
// 		</Popover>
// 	);
// }
