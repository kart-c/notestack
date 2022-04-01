import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { makeServer } from './server';
import { BrowserRouter } from 'react-router-dom';
import { ArchiveProvider, AuthProvider, NotesProvider, TrashProvider } from './Context';

// Call make Server
makeServer();

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<NotesProvider>
					<ArchiveProvider>
						<TrashProvider>
							<App />
						</TrashProvider>
					</ArchiveProvider>
				</NotesProvider>
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
