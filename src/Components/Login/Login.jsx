import React from 'react';
import styles from './Login.module.css';

const Login = () => {
	return (
		<div className={styles.modal}>
			<form>
				<h3>Login</h3>
				<div className={`input-container ${styles.inputContainer}`}>
					<label htmlFor="email">Email Address </label>
					<input type="email" id="email" name="email" placeholder="Enter your email" />
				</div>
				<div className={`input-container ${styles.inputContainer}`}>
					<label htmlFor="password">Password </label>
					<input type="password" id="password" name="password" placeholder="Enter your password" />
				</div>
				<button type="button">Forgot password?</button>
				<div className={`checkbox-container ${styles.checkboxContainer}`}>
					<input type="checkbox" name="disabled example input" id="checkbox-1" />
					<label htmlFor="checkbox-1">Remember me</label>
				</div>
				<button className={`btn ${styles.guestLogin}`} type="button">
					Log In as guest
				</button>
				<button className={`btn ${styles.btn}`} type="submit">
					Log In
				</button>
				<div className={styles.spacer}>
					<span>OR</span>
				</div>
				<button className={`btn ${styles.btn} ${styles.secondary}`} type="button">
					Signup
				</button>
			</form>
		</div>
	);
};

export { Login };
