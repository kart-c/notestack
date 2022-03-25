import React from 'react';
import styles from '../Login/Login.module.css';

const Signup = () => {
	return (
		<div className={styles.modal}>
			<form>
				<h3>Signup</h3>
				<div className={`input-container ${styles.inputContainer}`}>
					<label htmlFor="name">Full Name </label>
					<input type="text" id="name" name="name" placeholder="Enter your full name" />
				</div>
				<div className={`input-container ${styles.inputContainer}`}>
					<label htmlFor="email">Email Address </label>
					<input type="email" id="email" name="email" placeholder="Enter your email" />
				</div>
				<div className={`input-container ${styles.inputContainer}`}>
					<label htmlFor="password">Password </label>
					<input type="password" id="password" name="password" placeholder="Enter your password" />
				</div>
				<div className={`input-container ${styles.inputContainer}`}>
					<label htmlFor="confirm-password">Confirm Password </label>
					<input
						type="password"
						id="confirm-password"
						name="password"
						placeholder="Confirm password"
					/>
				</div>
				<div className={`checkbox-container ${styles.checkboxContainer}`}>
					<input type="checkbox" name="disabled example input" id="checkbox-1" />
					<label htmlFor="checkbox-1">Remember me</label>
				</div>
				<button className={`btn ${styles.btn}`} type="submit">
					Signup
				</button>
				<div className={styles.spacer}>
					<span>OR</span>
				</div>
				<button className={`btn ${styles.btn} ${styles.secondary}`} type="button">
					Log In
				</button>
			</form>
		</div>
	);
};

export { Signup };
