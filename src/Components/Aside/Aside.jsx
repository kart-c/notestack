import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Aside.module.css';

const Aside = () => {
	return (
		<aside className={styles.aside}>
			<div className={styles.asideBtnList}>
				<Link to="/home" className={styles.active}>
					<i className="fa-solid fa-clipboard"></i> All notes
				</Link>
				<div className={styles.spacer}></div>
				<Link to="/home">
					<i className="fa-solid fa-note-sticky"></i> Nature
				</Link>
				<Link to="/home">
					<i className="fa-solid fa-note-sticky"></i> Movies
				</Link>
				<Link to="/home">
					<i className="fa-solid fa-note-sticky"></i> Future
				</Link>
				<Link to="/home">
					<i className="fa-solid fa-note-sticky"></i> Work
				</Link>
				<button className={`btn btn-primary ${styles.newLabelBtn}`}>
					<i className="fa-solid fa-circle-plus"></i> Add Label
				</button>
				<div className={styles.spacer}></div>
			</div>
			<div className={styles.asideBtnList}>
				<Link to="/archive">
					<i className="fa-solid fa-box-archive"></i> Archive
				</Link>
				<Link to="/home">
					<i className="fa-solid fa-trash-can"></i> Trash
				</Link>
			</div>
			<div className={styles.userProfile}>
				<img src="https://picsum.photos/100" alt="user avatar" className="avatar avatar-sm" />
				<span>User name</span>
			</div>
		</aside>
	);
};

export { Aside };
