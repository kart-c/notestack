import { useState, useEffect } from 'react';
import HtmlParser from 'react-html-parser/lib/HtmlParser';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLabel } from '../../Context';
import { bgColorCheck } from '../../Utils';
import styles from './NoteCard.module.css';

const NoteCard = ({ title, content, bgColor, _id, currentLabel, date }) => {
	const [currPage, setCurrPage] = useState();

	const navigate = useNavigate();

	const location = useLocation();

	const {} = useLabel();

	useEffect(() => {
		if (currentLabel) {
			setCurrPage(currentLabel);
		} else {
			location.pathname.includes('home')
				? setCurrPage('home')
				: location.pathname.includes('archive')
				? setCurrPage('archive')
				: setCurrPage('trash');
		}
	});

	const cardDate = (date) => {
		const newDate = new Date(date).toDateString().split(' ');
		const newTime = new Date(date).toLocaleTimeString();
		return `${newDate[2]} ${newDate[1]} ${newTime}`;
	};

	return (
		<article
			className={`card ${styles.card} ${bgColorCheck(bgColor)}`}
			onClick={() => navigate(`/${currPage}/${_id}`)}
		>
			<div className={`content ${styles.contentContainer}`}>
				<div className={styles.title}>
					{HtmlParser(title)} <span>{cardDate(date)}</span>
				</div>
				<div className={styles.content}>{HtmlParser(content)}</div>
			</div>
		</article>
	);
};

export { NoteCard };
