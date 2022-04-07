import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../Context';

const RequiresAuth = ({ children }) => {
	const {
		authState: { token },
	} = useAuth();

	return token ? children : <Navigate to="/" />;
};

export { RequiresAuth };
