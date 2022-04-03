import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Aside.module.css';

const activeClass = ({ isActive }) => (isActive ? styles.active : '');

const Aside = () => {
	return (
		<aside className={styles.aside}>
			<div className={styles.asideBtnList}>
				<NavLink to="/home" className={activeClass}>
					<i className="fa-solid fa-clipboard"></i> All notes
				</NavLink>
				<div className={styles.spacer}></div>
				<button className={`btn btn-primary ${styles.newLabelBtn}`}>
					<i className="fa-solid fa-circle-plus"></i> Add Label
				</button>
				<div className={styles.spacer}></div>
			</div>
			<div className={styles.asideBtnList}>
				<NavLink to="/archive" className={activeClass}>
					<i className="fa-solid fa-box-archive"></i> Archive
				</NavLink>
				<NavLink to="/trash" className={activeClass}>
					<i className="fa-solid fa-trash-can"></i> Trash
				</NavLink>
			</div>
			<div className={styles.userProfile}>
				<img src="https://picsum.photos/100" alt="user avatar" className="avatar avatar-sm" />
				<span>User name</span>
			</div>
		</aside>
	);
};

export { Aside };
