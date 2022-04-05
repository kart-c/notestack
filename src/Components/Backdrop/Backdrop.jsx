import React from 'react';
import styles from './Backdrop.module.css';

const Backdrop = ({ setModalState, setLabelModal }) => {
	return (
		<div
			onClick={setModalState ? () => setModalState('') : () => setLabelModal(false)}
			className={styles.backdrop}
		></div>
	);
};

export { Backdrop };
