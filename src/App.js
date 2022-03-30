import { Route, Routes } from 'react-router-dom';
import { Home, Landing, SingleNotePage } from './Pages';
import Mockman from 'mockman-js';

import './App.css';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Landing />} />
			<Route path="/home" element={<Home />} />
			<Route path="/mock" element={<Mockman />} />
			<Route path="/home/:_id" element={<SingleNotePage />} />
		</Routes>
	);
}

export default App;
