import React from 'react';
import { FooterNav } from '../../Components';
import styles from './LabelPage.module.css';

const LabelPage = () => {
	return (
		<>
			<div className={styles.labelPageContainer}>Choose a note to see</div>
			<FooterNav />
		</>
	);
};

export { LabelPage };
