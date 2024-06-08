import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

const LoadingCard = () => {
	return (
		<Card className="cursor-pointer h-[318px] w-[381px] flex flex-col justify-evenly items-center drop-shadow-lg">
			<div className="flex flex-col space-y-3">
				<div className="space-y-2">
					<Skeleton className="h-4 w-[200px]" />
					<Skeleton className="h-4 w-[250px]" />
				</div>
				<Skeleton className="h-[170px] w-[320px] rounded-xl" />
			</div>
		</Card>
	);
};

const LoadingTemplate = () => {
	return (
		<Carousel className="w-[1200px] h-[318px] mx-[360px]">
			<CarouselContent className="w-[1200px] h-[318px]">
				<CarouselItem key={0} className="basis-1/3">
					<LoadingCard />
				</CarouselItem>
				<CarouselItem key={1} className="basis-1/3">
					<LoadingCard />
				</CarouselItem>
				<CarouselItem key={2} className="basis-1/3">
					<LoadingCard />
				</CarouselItem>
			</CarouselContent>
		</Carousel>
	);
};

export { LoadingTemplate };
