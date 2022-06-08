import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../Context';
import { loginService } from '../../Services';
import styles from './Login.module.css';

const Login = ({ setModalState }) => {
	const [loginData, setLoginData] = useState({ email: '', password: '', rememberMe: false });

	const { authDispatch } = useAuth();

	const navigate = useNavigate();

	const loginHandler = async (e) => {
		e.preventDefault();
		try {
			const response = await loginService(loginData, 'login');
			if (response.status === 200) {
				toast.success(`Welcome back! ${response.data.foundUser.firstName}`);
				localStorage.setItem('token', response.data.encodedToken);
				localStorage.setItem('user', JSON.stringify(response.data.foundUser));
				authDispatch({ type: 'AUTH', payload: response.data });
				setModalState('');
				navigate('/home');
			} else {
				console.error('ERROR: ', response);
			}
		} catch (error) {
			toast.error(error.response.data.errors[0]);
		}
	};

	return (
		<div className={styles.modal}>
			<form onSubmit={loginHandler}>
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
						required
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
						required
					/>
				</div>
				<div className={styles.checkboxContainer}>
					<div className="checkbox-container">
						<input
							type="checkbox"
							name="remember me"
							id="checkbox-1"
							checked={loginData.rememberMe}
							onChange={() => setLoginData((prev) => ({ ...prev, rememberMe: !prev.rememberMe }))}
						/>
						<label htmlFor="checkbox-1">Remember me</label>
					</div>
				</div>
				<button
					className={`btn ${styles.guestLogin}`}
					type="button"
					onClick={() =>
						setLoginData((prev) => ({
							...prev,
							email: 'kartik@gmail.com',
							password: 'kartik123',
							rememberMe: true,
						}))
					}
				>
					Guest Credentials
				</button>
				<button className={`btn ${styles.btn}`} type="submit">
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
