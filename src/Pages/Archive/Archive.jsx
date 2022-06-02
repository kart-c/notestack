import { FooterNav } from '../../Components';
import styles from './Archive.module.css';

const Archive = () => {
	return (
		<>
			<div className={styles.archiveContainer}>Choose a note to see</div>
			<FooterNav />
		</>
	);
};

export { Archive };
