import React from 'react';
import styles from './FooterNav.module.css';

const FooterNav = () => {
	return (
		<div className={styles.btnContainer}>
			<button className="btn btn-secondary">Navigation</button>
			<button className="btn btn-secondary">Notes</button>
		</div>
	);
};

export { FooterNav };
