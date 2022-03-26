import { useState } from 'react';
import { useAuth } from '../../Context';
import { loginService } from '../../Services';
import styles from './Login.module.css';

const Login = ({ setModalState }) => {
	const [loginData, setLoginData] = useState({ email: '', password: '' });

	const { authDispatch } = useAuth();

	const loginHandler = async (e) => {
		e.preventDefault();
		try {
			const response = await loginService(loginData, 'login');
			if (response.status === 200) {
				localStorage.setItem('token', response.data.encodedToken);
				authDispatch({ type: 'AUTH', payload: response.data.encodedToken });
				alert('Logged in!!');
				setModalState('');
			} else {
				console.error('ERROR: ', response);
				alert('ERROR');
			}
		} catch (error) {
			console.error('ERROR: ', error);
			alert('ERROR');
		}
	};

	return (
		<div className={styles.modal}>
			<form>
				<h3>Login</h3>
				<div className={`input-container ${styles.inputContainer}`}>
					<label htmlFor="email">Email Address </label>
					<input
						type="email"
						id="email"
						name="email"
						placeholder="johndoe@gmail.com"
						value={loginData.email}
						onChange={(e) => setLoginData((prev) => ({ ...prev, email: e.target.value }))}
					/>
				</div>
				<div className={`input-container ${styles.inputContainer}`}>
					<label htmlFor="password">Password </label>
					<input
						type="password"
						id="password"
						name="password"
						placeholder="************"
						value={loginData.password}
						onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
					/>
				</div>
				<div className={styles.checkboxContainer}>
					<div className="checkbox-container">
						<input type="checkbox" name="disabled example input" id="checkbox-1" />
						<label htmlFor="checkbox-1">Remember me</label>
					</div>
					<button type="button">Forgot password?</button>
				</div>
				<button
					className={`btn ${styles.guestLogin}`}
					type="button"
					onClick={() =>
						setLoginData((prev) => ({
							...prev,
							email: 'adarshbalika@gmail.com',
							password: 'adarshBalika123',
						}))
					}
				>
					Guest Login
				</button>
				<button className={`btn ${styles.btn}`} type="submit" onClick={loginHandler}>
					Log In
				</button>
				<div className={styles.spacer}>
					<span>OR</span>
				</div>
				<button
					className={`btn ${styles.btn} ${styles.secondary}`}
					type="button"
					onClick={() => setModalState('signup')}
				>
					Signup
				</button>
			</form>
		</div>
	);
};

export { Login };
