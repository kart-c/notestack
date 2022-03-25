import { Route, Routes } from 'react-router-dom';
import './App.css';
import Mockman from 'mockman-js';
import { Landing } from './Pages/Landing/Landing';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Landing />} />
			<Route path="/mock" element={<Mockman />} />
		</Routes>
	);
}

export default App;
