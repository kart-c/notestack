import { useState, useEffect } from 'react';
import HtmlParser from 'react-html-parser/lib/HtmlParser';
import { useLocation, useNavigate } from 'react-router-dom';
import { bgColorCheck } from '../../Utils';
import styles from './NoteCard.module.css';

const NoteCard = ({ title, content, bgColor, _id }) => {
	const [currPage, setCurrPage] = useState();

	const navigate = useNavigate();

	return (
		<article
			className={`card ${styles.card} ${bgColorCheck(bgColor)}`}
			onClick={() => navigate(`/home/${_id}`)}
		>
			<div className={`content ${styles.contentContainer}`}>
				<div className={styles.title}>{HtmlParser(title)}</div>
				<div className={styles.content}>{HtmlParser(content)}</div>
			</div>
		</article>
	);
};

export { NoteCard };
