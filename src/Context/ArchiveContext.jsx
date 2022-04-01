import { createContext, useContext, useReducer } from 'react';
import { archiveReducer } from '../Reducer';

const ArchiveContext = createContext({ archiveState: [], archiveDispatch: () => {} });

const ArchiveProvider = ({ children }) => {
	const [archiveState, archiveDispatch] = useReducer(archiveReducer, {
		archives: [],
	});

	return (
		<ArchiveContext.Provider value={{ archiveState, archiveDispatch }}>
			{children}
		</ArchiveContext.Provider>
	);
};

const useArchive = () => useContext(ArchiveContext);

export { ArchiveProvider, useArchive };
