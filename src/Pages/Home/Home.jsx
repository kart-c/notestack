import React from 'react';
import { Aside, Editor, LabelNotes } from '../../Components';
import styles from './Home.module.css';

const Home = () => {
	return (
		<>
			<Aside />
			<LabelNotes />
			<Editor />
		</>
	);
};

export { Home };
