import React from 'react';
import styles from './Aside.module.css';

const Aside = () => {
	return (
		<aside className={styles.aside}>
			<div className={styles.asideBtnList}>
				<button className={styles.active}>
					<i className="fa-solid fa-clipboard"></i> All notes
				</button>
				<div className={styles.spacer}></div>
				<button>
					<i className="fa-solid fa-note-sticky"></i> Nature
				</button>
				<button>
					<i className="fa-solid fa-note-sticky"></i> Movies
				</button>
				<button>
					<i className="fa-solid fa-note-sticky"></i> Future
				</button>
				<button>
					<i className="fa-solid fa-note-sticky"></i> Work
				</button>
				<button className={`btn btn-primary ${styles.newLabelBtn}`}>
					<i className="fa-solid fa-circle-plus"></i> Add Label
				</button>
				<div className={styles.spacer}></div>
			</div>
			<div className={styles.asideBtnList}>
				<button>
					<i className="fa-solid fa-box-archive"></i> Archive
				</button>
				<button>
					<i className="fa-solid fa-trash-can"></i> Trash
				</button>
			</div>
			<div className={styles.userProfile}>
				<img src="https://picsum.photos/100" alt="user avatar" className="avatar avatar-sm" />
				<span>User name</span>
			</div>
		</aside>
	);
};

export { Aside };
