import React from 'react';
import styles from '../Login/Login.module.css';

const Signup = ({ setModalState }) => {
	return (
		<div className={styles.modal}>
			<form>
				<h3>Signup</h3>
				<div className={`input-container ${styles.inputContainer}`}>
					<label htmlFor="name">Full Name </label>
					<input type="text" id="name" name="name" placeholder="John Doe" />
				</div>
				<div className={`input-container ${styles.inputContainer}`}>
					<label htmlFor="email">Email Address </label>
					<input type="email" id="email" name="email" placeholder="johndoe@gmail.com" />
				</div>
				<div className={`input-container ${styles.inputContainer}`}>
					<label htmlFor="password">Password </label>
					<input type="password" id="password" name="password" placeholder="************" />
				</div>
				<div className={`input-container ${styles.inputContainer}`}>
					<label htmlFor="confirm-password">Confirm Password </label>
					<input type="password" id="confirm-password" name="password" placeholder="************" />
				</div>
				<div className={styles.checkboxContainer}>
					<div className="checkbox-container ">
						<input type="checkbox" name="disabled example input" id="checkbox-1" />
						<label htmlFor="checkbox-1">Accept all terms and conditions</label>
					</div>
				</div>
				<button className={`btn ${styles.btn}`} type="submit">
					Signup
				</button>
				<div className={styles.spacer}>
					<span>OR</span>
				</div>
				<button
					className={`btn ${styles.btn} ${styles.secondary}`}
					type="button"
					onClick={() => setModalState('login')}
				>
					Log In
				</button>
			</form>
		</div>
	);
};

export { Signup };
