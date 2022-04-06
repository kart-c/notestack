import { useEffect, createContext, useContext, useReducer } from 'react';
import { authReducer } from '../Reducer';

const AuthContext = createContext({
	authState: {},
	authDispatch: () => {},
});

const AuthProvider = ({ children }) => {
	const [authState, authDispatch] = useReducer(authReducer, {
		token: '',
		user: '',
	});

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			authDispatch({ type: 'AUTH', payload: token });
		}
	}, []);

	return (
		<AuthContext.Provider value={{ authState, authDispatch }}>{children}</AuthContext.Provider>
	);
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
