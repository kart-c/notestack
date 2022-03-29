import React from 'react';
import HtmlParser from 'react-html-parser/lib/HtmlParser';
import { bgColorCheck } from '../../Utils';
import styles from './NoteCard.module.css';

const NoteCard = ({ title, content, bgColor }) => {
	return (
		<article className={`card ${styles.card} ${bgColorCheck(bgColor)}`}>
			<div className={`content ${styles.content}`}>
				{HtmlParser(title)}
				{HtmlParser(content)}
			</div>
		</article>
	);
};

export { NoteCard };
