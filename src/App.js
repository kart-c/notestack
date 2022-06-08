import { Fragment } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Home, Landing, Archive, Trash, LabelPage } from './Pages';
import Mockman from 'mockman-js';
import { Aside, LabelNotes, RequiresAuth, SingleNote } from './Components';
import { useLabel } from './Context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
	const location = useLocation();

	const {
		labelState: { labels },
	} = useLabel();

	return (
		<>
			<ToastContainer
				theme="colored"
				position="bottom-right"
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			{location.pathname !== '/' ? (
				<>
					<Aside />
					<LabelNotes />
				</>
			) : null}
			<Routes>
				<Route path="/" element={<Landing />} />

				<Route path="/home" element={<RequiresAuth>{<Home />}</RequiresAuth>} />
				<Route path="/mock" element={<Mockman />} />
				<Route path="/home/:_id" element={<SingleNote />} />
				<Route
					path="/archive"
					element={
						<RequiresAuth>
							<Archive />
						</RequiresAuth>
					}
				/>
				<Route
					path="/archive/:_id"
					element={
						<RequiresAuth>
							<SingleNote />
						</RequiresAuth>
					}
				/>
				<Route
					path="/trash"
					element={
						<RequiresAuth>
							<Trash />
						</RequiresAuth>
					}
				/>
				<Route
					path="/trash/:_id"
					element={
						<RequiresAuth>
							<SingleNote />
						</RequiresAuth>
					}
				/>
				{labels.length > 0
					? labels.map((label) => (
							<Fragment key={label}>
								<Route
									path={`/${label}`}
									element={
										<RequiresAuth>
											<LabelPage />
										</RequiresAuth>
									}
								/>
								<Route
									path={`/${label}/:_id`}
									element={
										<RequiresAuth>
											<SingleNote />
										</RequiresAuth>
									}
								/>
							</Fragment>
					  ))
					: null}
			</Routes>
		</>
	);
}

export default App;
