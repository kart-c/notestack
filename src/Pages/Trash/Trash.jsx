import React from 'react';
import { FooterNav } from '../../Components';
import styles from './Trash.module.css';

const Trash = () => {
	return (
		<>
			<div className={styles.trashContainer}>Choose a note to see</div>;
			<FooterNav />
		</>
	);
};

export { Trash };
