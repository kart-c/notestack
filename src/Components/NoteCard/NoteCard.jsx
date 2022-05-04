import { useState, useEffect } from 'react';
import HtmlParser from 'react-html-parser/lib/HtmlParser';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFooterNav } from '../../Context';
import { bgColorCheck } from '../../Utils';
import styles from './NoteCard.module.css';

const NoteCard = ({ title, content, bgColor, _id, currentLabel, date, priority }) => {
	const [currPage, setCurrPage] = useState();

	const navigate = useNavigate();

	const location = useLocation();

	const { setFooterNav } = useFooterNav();

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
		const newTime = new Date(date).toLocaleTimeString().slice(0, 5);
		return `${newDate[2]} ${newDate[1]} ${newTime}`;
	};

	const newNoteHandler = () => {
		navigate(`/${currPage}/${_id}`);
		setFooterNav((prev) => ({ ...prev, labelNotes: false }));
	};

	return (
		<article className={`card ${styles.card} ${bgColorCheck(bgColor)}`} onClick={newNoteHandler}>
			{priority ? <span className={styles.priorityTag}>{priority}</span> : null}
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
