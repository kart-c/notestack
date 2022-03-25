import React from 'react';
import styles from './Backdrop.module.css';

const Backdrop = ({ setModalState }) => {
	return <div onClick={() => setModalState('')} className={styles.backdrop}></div>;
};

export { Backdrop };
