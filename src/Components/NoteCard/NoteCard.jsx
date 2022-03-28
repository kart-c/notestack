import React from 'react';
import HtmlParser from 'react-html-parser/lib/HtmlParser';
import styles from './NoteCard.module.css';

const NoteCard = ({ noteTitle, noteContent }) => {
	return (
		<article className={`card ${styles.card}`}>
			<div className={`content ${styles.content}`}>
				<span>{HtmlParser(noteTitle)}</span>
				<p>{HtmlParser(noteContent)}</p>
			</div>
		</article>
	);
};

export { NoteCard };
