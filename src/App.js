import { Fragment } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Home, Landing, Archive, Trash, LabelPage } from './Pages';
import Mockman from 'mockman-js';
import { Aside, LabelNotes, SingleNote } from './Components';
import { useLabel } from './Context';
import './App.css';

function App() {
	const location = useLocation();

	const {
		labelState: { labels },
	} = useLabel();

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
				<Route path="/trash/:_id" element={<SingleNote />} />
				{labels.length > 0
					? labels.map((label) => (
							<Fragment key={label}>
								<Route path={`/${label}`} element={<LabelPage />} />
								<Route path={`/${label}/:_id`} element={<SingleNote />} />
							</Fragment>
					  ))
					: null}
			</Routes>
		</>
	);
}

export default App;
