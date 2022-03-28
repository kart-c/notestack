import React from 'react';
import HtmlParser from 'react-html-parser/lib/HtmlParser';
import styles from './NoteCard.module.css';

const NoteCard = ({ noteTitle, noteContent, bgColor }) => {
	return (
		<article className={`card ${styles.card}`} style={{ backgroundColor: bgColor }}>
			<div className={`content ${styles.content}`}>
				{HtmlParser(noteTitle)}
				{HtmlParser(noteContent)}
			</div>
		</article>
	);
};

export { NoteCard };
