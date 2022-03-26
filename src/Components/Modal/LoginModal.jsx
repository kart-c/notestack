import React from 'react';
import { Login, Signup } from '../index';

const LoginModal = ({ modalState, setModalState }) => {
	if (modalState === 'login') {
		return <Login setModalState={setModalState} />;
	} else {
		return <Signup setModalState={setModalState} />;
	}
};

export { LoginModal };
