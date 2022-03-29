import React from 'react';
import HtmlParser from 'react-html-parser/lib/HtmlParser';
import { useParams } from 'react-router-dom';
import { useNotes } from '../../Context';
import { bgColorCheck } from '../../Utils';
import styles from './SingleNote.module.css';

const SingleNote = () => {
	const {
		notesState: { notes },
	} = useNotes();

	const params = useParams();

	const currentNote = notes.find((note) => note._id === params._id);

	return (
		<div className={styles.noteContainer}>
			<article className={` ${styles.note} ${bgColorCheck(currentNote.bgColor)}`}>
				<div className={styles.noteTitle}>{HtmlParser(currentNote.title)}</div>
				<div className={styles.noteContent}>{HtmlParser(currentNote.content)}</div>
			</article>
		</div>
	);
};

export { SingleNote };
