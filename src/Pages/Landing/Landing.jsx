import { useState } from 'react';
import { LoginModal, Backdrop } from '../../Components';
import { useAuth } from '../../Context';
import HeroImg from '../../Assets/hero-img.png';
import styles from './Landing.module.css';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
	const [modalState, setModalState] = useState();
	const {
		authState: { token },
	} = useAuth();
	const navigate = useNavigate();

	return (
		<>
			{modalState === 'login' && (
				<LoginModal modalState={modalState} setModalState={setModalState} />
			)}
			{modalState === 'signup' && (
				<LoginModal modalState={modalState} setModalState={setModalState} />
			)}
			{modalState && <Backdrop setModalState={setModalState} />}
			<main className={styles.main}>
				<h1 className={styles.heading}>
					<span>Note</span>
					Stack
					<span className={styles.headingLogo} />
				</h1>
				<section className={styles.heroContainer}>
					<div className={styles.heroImg}>
						<img src={HeroImg} alt="Hero Image" />
					</div>
					<div>
						<h3>
							<span>Create. </span>Organize.
						</h3>
						<h3>
							Share.
							<span className={styles.heroTextDesign}>
								Easy <span></span>
							</span>
						</h3>
						<p>
							NoteStack is the best place to jot down quick thoughts. Take notes the simple way for
							free. Forever.
						</p>
						<div className={styles.authContainer}>
							{token ? (
								<button
									className={`btn btn-primary ${styles.primaryBtn}`}
									onClick={() => navigate('/home')}
								>
									Open Notes
								</button>
							) : (
								<>
									<button
										className={`btn btn-primary ${styles.primaryBtn}`}
										onClick={() => setModalState('signup')}
									>
										Join Now
									</button>
									<button
										className={`btn btn-primary ${styles.secondaryBtn}`}
										onClick={() => setModalState('login')}
									>
										Already have an account ?
									</button>
								</>
							)}
						</div>
					</div>
				</section>
			</main>
		</>
	);
};

export { Landing };
