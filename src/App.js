import { Route, Routes } from 'react-router-dom';
import { Home, Landing } from './Pages';
import Mockman from 'mockman-js';
import './App.css';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Landing />} />
			<Route path="/home" element={<Home />} />
			<Route path="/mock" element={<Mockman />} />
		</Routes>
	);
}

export default App;
