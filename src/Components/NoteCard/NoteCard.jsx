import React from 'react';
import HtmlParser from 'react-html-parser/lib/HtmlParser';
import { useNavigate } from 'react-router-dom';
import { bgColorCheck } from '../../Utils';
import styles from './NoteCard.module.css';

const NoteCard = ({ title, content, bgColor, _id }) => {
	const navigate = useNavigate();

	return (
		<article
			className={`card ${styles.card} ${bgColorCheck(bgColor)}`}
			onClick={() => navigate(`/home/${_id}`)}
		>
			<div className={`content ${styles.content}`}>
				{HtmlParser(title)}
				{HtmlParser(content)}
			</div>
		</article>
	);
};

export { NoteCard };
