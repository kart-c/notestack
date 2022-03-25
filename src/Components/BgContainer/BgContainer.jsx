import styles from './BgContainer.module.css';

const BgContainer = ({ children }) => {
	return (
		<div className={styles.BgContainer}>
			<div className={styles.circleOne}></div>
			<div className={styles.circleTwo}></div>
			<div className={styles.circleThree}></div>
			{children}
		</div>
	);
};

export { BgContainer };
