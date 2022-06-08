import { useEffect, createContext, useContext, useReducer } from 'react';
import { toast } from 'react-toastify';
import { notesReducer } from '../Reducer';
import { getNotes } from '../Services';
import { useAuth } from './AuthContext';

const NotesContext = createContext({ notesState: { notes: [] }, notesDispatch: () => {} });

const NotesProvider = ({ children }) => {
	const {
		authState: { token },
	} = useAuth();

	useEffect(() => {
		(async () => {
			try {
				const getAllNotes = await getNotes(token);
				if (getAllNotes.status === 200) {
					notesDispatch({ type: 'GET_ALL_NOTES', payload: getAllNotes.data.notes });
				}
			} catch (error) {
				toast.error('Something went wrong! Cannot get notes');
			}
		})();
	}, [token]);
	const [notesState, notesDispatch] = useReducer(notesReducer, { notes: [] });
	return (
		<NotesContext.Provider value={{ notesState, notesDispatch }}>{children}</NotesContext.Provider>
	);
};

const useNotes = () => useContext(NotesContext);

export { NotesProvider, useNotes };
