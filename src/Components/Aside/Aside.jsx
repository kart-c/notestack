import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LabelModal } from '../../Components';
import { useAuth, useFooterNav, useLabel } from '../../Context';
import styles from './Aside.module.css';

const activeClass = ({ isActive }) => (isActive ? styles.active : '');

const Aside = () => {
	const [labelModal, setLabelModal] = useState(false);

	const {
		labelState: { labels },
	} = useLabel();

	const {
		authState: { user },
		authDispatch,
	} = useAuth();

	const navigate = useNavigate();

	const { footerNav, setFooterNav } = useFooterNav();

	const logoutHandler = () => {
		toast.success('Logged out!');
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		authDispatch({ type: 'LOGOUT' });
		navigate('/');
	};

	return (
		<>
			<div
				className={footerNav.nav ? styles.backdrop : ''}
				onClick={() => setFooterNav((prev) => ({ ...prev, nav: false }))}
			></div>
			<aside className={`${styles.aside} ${footerNav.nav ? styles.mobileAside : ''}`}>
				{labelModal ? (
					<>
						<LabelModal setLabelModal={setLabelModal} />
					</>
				) : null}
				<div className={styles.asideBtnList}>
					<NavLink
						to="/home"
						className={activeClass}
						onClick={() => setFooterNav((prev) => ({ ...prev, nav: false }))}
					>
						<i className="fa-solid fa-clipboard"></i> All notes
					</NavLink>
					<div className={styles.spacer}></div>
					{labels.length > 0
						? labels.map((label) => (
								<NavLink
									key={label}
									to={`/${label}`}
									className={activeClass}
									onClick={() => setFooterNav((prev) => ({ ...prev, nav: false }))}
								>
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
				<div className={`${styles.asideBtnList} ${styles.btnListTwo}`}>
					<NavLink
						to="/archive"
						className={activeClass}
						onClick={() => setFooterNav((prev) => ({ ...prev, nav: false }))}
					>
						<i className="fa-solid fa-box-archive"></i> Archive
					</NavLink>
					<NavLink
						to="/trash"
						className={activeClass}
						onClick={() => setFooterNav((prev) => ({ ...prev, nav: false }))}
					>
						<i className="fa-solid fa-trash-can"></i> Trash
					</NavLink>
				</div>
				<div className={styles.userProfile}>
					<span>{user.firstName}</span>
					<button className="btn btn-primary" onClick={logoutHandler} title="logout">
						<i className="fa-solid fa-arrow-right-from-bracket"></i>
					</button>
				</div>
			</aside>
		</>
	);
};

export { Aside };
