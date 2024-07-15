import Home from './pages/Home'
import Bio from './pages/Bio'
import Works from './pages/Works'
import Skills from './pages/Skills'
import Contact from './pages/Contact'
import Experience from './pages/Experience'
import { useEffect, useState } from 'react'

function App() {
	const [scrollPosition, setScrollPosition] = useState(0);
	const handleScroll = () => {
		const position = window.pageYOffset;
		const pageHeight =  document.documentElement.scrollHeight - document.documentElement.clientHeight
		setScrollPosition(position / pageHeight);
	};
	useEffect(() => {
		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<>
			<Experience scrollOffset={ scrollPosition } />
			<Home />
			<Bio />
			<Works />
			<Skills />
			<Contact />
		</>
	)
}

export default App
