import { Link } from 'react-router-dom';
import error404 from '../../Assets/404.png';
import styles from './Error.module.css';

const Error = () => {
	return (
		<>
			<div className={styles.errorPage}>
				<span className={styles.errorPageTitle}>Something Went Wrong!!</span>
				<img src={error404} alt="responsive image" className="resp-img" />
				<Link to="/home">Go Back Home</Link>
			</div>
		</>
	);
};

export { Error };
