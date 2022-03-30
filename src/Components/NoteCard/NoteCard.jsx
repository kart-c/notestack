import React from 'react';
import HtmlParser from 'react-html-parser/lib/HtmlParser';
import { useNavigate } from 'react-router-dom';
import { bgColorCheck } from '../../Utils';
import styles from './NoteCard.module.css';

const NoteCard = ({ title, content, bgColor, _id }) => {
	const navigate = useNavigate();

	const parsedContent = HtmlParser(content);

	const arrayOfContent = parsedContent.map((content) => [...content.props.children]);
	const newContent = arrayOfContent.flat();

	return (
		<article
			className={`card ${styles.card} ${bgColorCheck(bgColor)}`}
			onClick={() => navigate(`/home/${_id}`)}
		>
			<div className={`content ${styles.contentContainer}`}>
				<div className={styles.title}>{HtmlParser(title)}</div>
				<div className={styles.content}>{newContent.join(' ')}</div>
			</div>
		</article>
	);
};

export { NoteCard };
