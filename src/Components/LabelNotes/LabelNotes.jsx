import React from 'react';
import { useNotes } from '../../Context';
import { NoteCard } from '../NoteCard/NoteCard';
import styles from './LabelNotes.module.css';

const LabelNotes = () => {
	const {
		notesState: { notes },
	} = useNotes();

	return (
		<div className={styles.labelNotes}>
			<div className={`input-container ${styles.inputContainer}`}>
				<input type="text" id="search" name="search" placeholder="Search Notes ..." />
				<i className="fa-solid fa-magnifying-glass"></i>
			</div>
			<div className={styles.labelFilter}>
				<div className="radio-container">
					<input type="radio" name="example input" id="newest" />
					<label htmlFor="newest">Newest First</label>
				</div>
				<div className="radio-container">
					<input type="radio" name="example input" id="last" />
					<label htmlFor="last">Last First</label>
				</div>
			</div>
			{notes.length > 0 ? notes.map((note) => <NoteCard key={note._id} {...note} />) : null}
		</div>
	);
};

export { LabelNotes };
