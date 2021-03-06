import { createContext, useContext, useReducer } from 'react';
import { authReducer } from '../Reducer';

const AuthContext = createContext({
	authState: {},
	authDispatch: () => {},
});

const AuthProvider = ({ children }) => {
	const [authState, authDispatch] = useReducer(authReducer, {
		token: localStorage.getItem('token') || '',
		user: JSON.parse(localStorage.getItem('user')) || '',
	});

	return (
		<AuthContext.Provider value={{ authState, authDispatch }}>{children}</AuthContext.Provider>
	);
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
