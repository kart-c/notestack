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
				<div className={styles.noteTitle}>
					{HtmlParser(currentNote.title)}
					<div className={styles.btnContainer}>
						<button title="pin">
							<i className="fa-solid fa-thumbtack"></i>
						</button>
						<button title="archive">
							<i className="fa-solid fa-box-archive"></i>
						</button>
						<button title="trash">
							<i className="fa-solid fa-trash-can"></i>
						</button>
					</div>
				</div>
				<small>{currentNote.date}</small>
				<div className={`${styles.chipContainer} ${bgColorCheck(currentNote.bgColor)}`}>
					<span className={styles.chip}>
						Nature <i className="fas fa-times-circle"></i>
					</span>
				</div>
				<div className={styles.noteContent}>{HtmlParser(currentNote.content)}</div>
			</article>
		</div>
	);
};

export { SingleNote };
