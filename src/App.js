import { Route, Routes, useLocation } from 'react-router-dom';
import { Home, Landing, Archive, Trash } from './Pages';
import Mockman from 'mockman-js';
import { Aside, LabelNotes, SingleNote } from './Components';
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
				<Route path="/home/:_id" element={<SingleNote />} />
				<Route path="/archive" element={<Archive />} />
				<Route path="/archive/:_id" element={<SingleNote />} />
				<Route path="/trash" element={<Trash />} />
			</Routes>
		</>
	);
}

export default App;
