import React from 'react';
import { FooterNav } from '../../Components';
import styles from './Trash.module.css';

const Trash = () => {
	return (
		<>
			<div className={styles.trashContainer}></div>;
			<FooterNav />
		</>
	);
};

export { Trash };
