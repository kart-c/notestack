import { createContext, useReducer, useContext } from 'react';
import { labelReducer } from '../Reducer';

const LabelContext = createContext({ labelState: { labels: [] }, labelDispatch: () => {} });

const LabelProvider = ({ children }) => {
	const [labelState, labelDispatch] = useReducer(labelReducer, {
		labels: [],
	});
	return (
		<LabelContext.Provider value={{ labelState, labelDispatch }}>{children}</LabelContext.Provider>
	);
};

const useLabel = () => useContext(LabelContext);

export { LabelProvider, useLabel };
