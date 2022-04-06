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
		const encodedToken = localStorage.getItem('token');
		const foundUser = localStorage.getItem('user');
		if (encodedToken) {
			authDispatch({ type: 'AUTH', payload: { encodedToken, foundUser } });
		}
	}, []);

	return (
		<AuthContext.Provider value={{ authState, authDispatch }}>{children}</AuthContext.Provider>
	);
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
