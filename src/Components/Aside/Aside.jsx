import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Backdrop } from '../Backdrop/Backdrop';
import { useLabel } from '../../Context';
import styles from './Aside.module.css';

const activeClass = ({ isActive }) => (isActive ? styles.active : '');

const Aside = () => {
	const [newLabel, setNewLabel] = useState('');
	const [labelModal, setLabelModal] = useState(false);

	const {
		labelState: { labels },
		labelDispatch,
	} = useLabel();

	const newLabelHandler = () => {
		if (labels.some((label) => label === newLabel)) {
			console.log('label already present');
			setLabelModal(false);
			setNewLabel('');
		} else {
			labelDispatch({ type: 'ADD_NEW_NOTE', payload: newLabel });
			setLabelModal(false);
			setNewLabel('');
		}
	};

	return (
		<aside className={styles.aside}>
			{labelModal ? (
				<>
					<Backdrop setLabelModal={setLabelModal} />
					<div className={styles.labelModal}>
						<div className="input-container">
							<label htmlFor="label">Add new Label</label>
							<input
								type="text"
								id="label"
								name="label"
								placeholder="Travel"
								value={newLabel}
								onChange={(e) => setNewLabel(e.target.value)}
							/>
						</div>
						<button className="btn btn-info btn-round" onClick={newLabelHandler}>
							Add
						</button>
					</div>
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
								{label}
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
