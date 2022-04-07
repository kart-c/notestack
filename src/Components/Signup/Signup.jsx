import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../Context';
import { loginService } from '../../Services';
import styles from '../Login/Login.module.css';

const Signup = ({ setModalState }) => {
	const [signupData, setSignupData] = useState({
		email: '',
		password: '',
		firstName: '',
		confirmPassword: '',
	});

	const { authDispatch } = useAuth();

	const navigate = useNavigate();

	const signupHandler = async (e) => {
		e.preventDefault();
		if (
			signupData.email &&
			signupData.password &&
			signupData.firstName &&
			signupData.confirmPassword
		) {
			if (signupData.password === signupData.confirmPassword) {
				try {
					const response = await loginService(signupData, 'signup');
					if (response.status === 201) {
						localStorage.setItem('token', response.data.encodedToken);
						localStorage.setItem('user', JSON.stringify(response.data.createdUser));
						authDispatch({ type: 'AUTH', payload: response.data });
						toast.success(`Welcome ${response.data.createdUser.firstName}`);
						setModalState('');
						navigate('/home');
					} else {
						console.error('ERROR: ', response);
						alert('ERROR');
					}
				} catch (error) {
					console.error('ERROR: ', error);
					alert('ERROR');
				}
			} else {
				toast.error('Passwords do not match');
			}
		} else {
			toast.warning('Fill all inputs');
		}
	};
	return (
		<div className={styles.modal}>
			<form>
				<h3>Signup</h3>
				<div className={`input-container ${styles.inputContainer}`}>
					<label htmlFor="name">Full Name </label>
					<input
						type="text"
						id="name"
						name="name"
						placeholder="John Doe"
						value={signupData.firstName}
						onChange={(e) => setSignupData((prev) => ({ ...prev, firstName: e.target.value }))}
					/>
				</div>
				<div className={`input-container ${styles.inputContainer}`}>
					<label htmlFor="email">Email Address </label>
					<input
						type="email"
						id="email"
						name="email"
						placeholder="johndoe@gmail.com"
						value={signupData.email}
						onChange={(e) => setSignupData((prev) => ({ ...prev, email: e.target.value }))}
					/>
				</div>
				<div className={`input-container ${styles.inputContainer}`}>
					<label htmlFor="password">Password </label>
					<input
						type="password"
						id="password"
						name="password"
						placeholder="************"
						value={signupData.password}
						onChange={(e) => setSignupData((prev) => ({ ...prev, password: e.target.value }))}
					/>
				</div>
				<div className={`input-container ${styles.inputContainer}`}>
					<label htmlFor="confirm-password">Confirm Password </label>
					<input
						type="password"
						id="confirm-password"
						name="password"
						placeholder="************"
						value={signupData.confirmPassword}
						onChange={(e) =>
							setSignupData((prev) => ({ ...prev, confirmPassword: e.target.value }))
						}
					/>
				</div>
				<div className={styles.checkboxContainer}>
					<div className="checkbox-container ">
						<input type="checkbox" name="disabled example input" id="checkbox-1" />
						<label htmlFor="checkbox-1">Accept all terms and conditions</label>
					</div>
				</div>
				<button className={`btn ${styles.btn}`} type="submit" onClick={signupHandler}>
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
