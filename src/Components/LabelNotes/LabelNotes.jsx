import React from 'react';
import styles from './LabelNotes.module.css';

const LabelNotes = () => {
	return (
		<div className={styles.labelNotes}>
			<div className={`input-container ${styles.inputContainer}`}>
				<input type="text" id="search" name="search" placeholder="Search Notes ..." />
				<i className="fa-solid fa-magnifying-glass"></i>
			</div>
			<div className={styles.labelFilter}>
				<div className="radio-container">
					<input type="radio" name="example input" id="newest" />
					<label htmlFor="newest">Newest First</label>
				</div>
				<div className="radio-container">
					<input type="radio" name="example input" id="last" />
					<label htmlFor="last">Last First</label>
				</div>
			</div>
			<article className={`card ${styles.card}`}>
				<div className={`content ${styles.content}`}>
					<span>Card title</span>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores dignissimos libero.
					</p>
				</div>
				<img src="https://picsum.photos/100" alt="basic-card image" className="card-img" />
			</article>
			<article className={`card ${styles.card}`}>
				<div className={`content ${styles.content}`}>
					<span>Card title</span>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores dignissimos libero.
					</p>
				</div>
				<img src="https://picsum.photos/100" alt="basic-card image" className="card-img" />
			</article>
			<article className={`card ${styles.card}`}>
				<div className={`content ${styles.content}`}>
					<span>Card title</span>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores dignissimos libero.
					</p>
				</div>
				<img src="https://picsum.photos/100" alt="basic-card image" className="card-img" />
			</article>
		</div>
	);
};

export { LabelNotes };
