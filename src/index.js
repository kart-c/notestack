import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { makeServer } from './server';
import { BrowserRouter } from 'react-router-dom';
import {
	ArchiveProvider,
	AuthProvider,
	FooterNavProvider,
	LabelProvider,
	NotesProvider,
	TrashProvider,
} from './Context';

// Call make Server
makeServer();

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<NotesProvider>
					<LabelProvider>
						<ArchiveProvider>
							<TrashProvider>
								<FooterNavProvider>
									<App />
								</FooterNavProvider>
							</TrashProvider>
						</ArchiveProvider>
					</LabelProvider>
				</NotesProvider>
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
