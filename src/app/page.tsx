'use client';

import Navbar from './_components/web/navbar';
import Head from './_components/web/head';
import Body from './_components/web/body';
import Footer from './_components/web/footer';
import { useEffect, useState } from 'react';
import EventCardModal from './_components/modal/eventCardModal';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
	const [currentPage, setCurrentPage] = useState('');

	useEffect(() => {
		console.log('Current Page: ', currentPage);
	}, [currentPage]);

	return (
		<div>
			<Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
			<div className="flex flex-col justify-center items-center w-full mx-auto">
				<Head currentPage={currentPage} setCurrentPage={setCurrentPage} />
				<Body currentPage={currentPage} setCurrentPage={setCurrentPage} />
				<Footer currentPage={currentPage} setCurrentPage={setCurrentPage} />
			</div>
		</div>
	);
}
