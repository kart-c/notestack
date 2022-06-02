import React from 'react';
import { useFooterNav } from '../../Context';
import styles from './FooterNav.module.css';

const FooterNav = () => {
	const { setFooterNav } = useFooterNav();

	return (
		<div className={styles.btnContainer}>
			<button
				className="btn btn-secondary"
				onClick={() => setFooterNav((prev) => ({ ...prev, nav: true, labelNotes: false }))}
			>
				Navigation
			</button>
			<button
				className="btn btn-secondary"
				onClick={() => setFooterNav((prev) => ({ ...prev, nav: false, labelNotes: true }))}
			>
				Notes
			</button>
		</div>
	);
};

export { FooterNav };
