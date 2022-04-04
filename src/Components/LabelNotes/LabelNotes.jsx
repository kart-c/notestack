import React from 'react';
import { useLocation } from 'react-router-dom';
import { useArchive, useLabel, useNotes, useTrash } from '../../Context';
import { NoteCard } from '../NoteCard/NoteCard';
import styles from './LabelNotes.module.css';

const LabelNotes = () => {
	const location = useLocation();

	const {
		notesState: { notes },
	} = useNotes();

	const {
		archiveState: { archives },
	} = useArchive();

	const {
		trashState: { trash },
	} = useTrash();

	const {
		labelState: { labels },
	} = useLabel();

	const checkCurrPage = () =>
		location.pathname.includes('home')
			? notes
			: location.pathname.includes('archive')
			? archives
			: trash;

	const checkLabelPage = () => {
		const currLabelPage = labels.find((label) => location.pathname.slice(1) === label);
		return notes.filter((note) => note.tags.find((tag) => tag === currLabelPage));
	};

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
			{location.pathname.includes('home') ||
			location.pathname.includes('archive') ||
			location.pathname.includes('trash')
				? checkCurrPage().length > 0
					? checkCurrPage().map((note) => <NoteCard key={note._id} {...note} />)
					: null
				: checkLabelPage().length > 0
				? checkLabelPage().map((note) => <NoteCard key={note._id} {...note} />)
				: null}
		</div>
	);
};

export { LabelNotes };
