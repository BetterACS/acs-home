import { WebComponentProps } from '../../../types';
import { motion, AnimatePresence } from 'framer-motion';
import MultiFunctionButton from '../utils/multiFunctionButton';
import SearchBox from '../specific/searchBox';
export default function Head(props: WebComponentProps) {
	const { currentPage } = props;

	return (
		<div className="pt-[372px] w-[1200px]">
			<AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
				{(currentPage === '' || currentPage !== '') && <SearchBox />}
			</AnimatePresence>
		</div>
	);
}
