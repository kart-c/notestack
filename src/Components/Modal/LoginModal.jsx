import React from 'react';
import { Login, Signup } from '../index';

const LoginModal = ({ modalState }) => {
	if (modalState === 'login') {
		return <Login />;
	} else {
		return <Signup />;
	}
};

export { LoginModal };
