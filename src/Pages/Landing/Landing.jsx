import styles from './Landing.module.css';
import HeroImg from '../../Assets/hero-img.png';
import { BgContainer } from '../../Components/index';
const Landing = () => {
	return (
		<main className={styles.main}>
			<BgContainer>
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
								Easy. <span></span>
							</span>
						</h3>
						<p>
							NoteStack is the best place to jot down quick thoughts. Take notes the simple way for
							free. Forever.
						</p>
						<div className={styles.authContainer}>
							<button className={`btn btn-primary ${styles.primaryBtn}`}>Join Now</button>
							<button className={`btn ${styles.secondaryBtn}`}>Already have an account ?</button>
						</div>
					</div>
				</section>
			</BgContainer>
		</main>
	);
};

export { Landing };
