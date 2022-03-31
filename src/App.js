import { Route, Routes, useLocation } from 'react-router-dom';
import { Home, Landing, SingleNotePage, Archive } from './Pages';
import Mockman from 'mockman-js';
import { ArchiveNote, Aside, LabelNotes } from './Components';
import './App.css';

function App() {
	const location = useLocation();

	return (
		<>
			{location.pathname !== '/' ? (
				<>
					<Aside />
					<LabelNotes />
				</>
			) : null}
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/home" element={<Home />} />
				<Route path="/mock" element={<Mockman />} />
				<Route path="/home/:_id" element={<SingleNotePage />} />
				<Route path="/archive" element={<Archive />} />
				<Route path="/archive/:_id" element={<ArchiveNote />} />
			</Routes>
		</>
	);
}

export default App;
