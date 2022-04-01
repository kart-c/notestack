import { createContext, useContext, useReducer } from 'react';
import { trashReducer } from '../Reducer';

const TrashContext = createContext({ trashState: { trash: [] }, trashDispatch: () => {} });

const TrashProvider = ({ children }) => {
	const [trashState, trashDispatch] = useReducer(trashReducer, { trash: [] });

	return (
		<TrashContext.Provider value={{ trashState, trashDispatch }}>{children}</TrashContext.Provider>
	);
};

const useTrash = () => useContext(TrashContext);

export { TrashProvider, useTrash };
