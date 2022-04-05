import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LabelModal } from '../../Components';
import { useLabel } from '../../Context';
import styles from './Aside.module.css';

const activeClass = ({ isActive }) => (isActive ? styles.active : '');

const Aside = () => {
	const [labelModal, setLabelModal] = useState(false);

	const {
		labelState: { labels },
	} = useLabel();

	return (
		<aside className={styles.aside}>
			{labelModal ? (
				<>
					<LabelModal setLabelModal={setLabelModal} />
				</>
			) : null}
			<div className={styles.asideBtnList}>
				<NavLink to="/home" className={activeClass}>
					<i className="fa-solid fa-clipboard"></i> All notes
				</NavLink>
				<div className={styles.spacer}></div>
				{labels.length > 0
					? labels.map((label) => (
							<NavLink key={label} to={`/${label}`} className={activeClass}>
								<i className="fa-solid fa-tag"></i> {label}
							</NavLink>
					  ))
					: null}
				<button
					className={`btn btn-primary ${styles.newLabelBtn}`}
					onClick={() => setLabelModal(true)}
				>
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
