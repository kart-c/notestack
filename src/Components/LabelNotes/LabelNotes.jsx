import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useArchive, useLabel, useNotes, useTrash } from '../../Context';
import { sortByDate } from '../../Utils';
import { NoteCard } from '../NoteCard/NoteCard';
import styles from './LabelNotes.module.css';

const LabelNotes = () => {
	const [sortBy, setSortBy] = useState('');
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

	const sortedCurrPage = sortByDate(checkCurrPage(), sortBy);

	const locationArr = location.pathname.split('/');

	const currentLabel = labels.find((label) => locationArr[1] === label);

	const checkLabelPage = () =>
		currentLabel
			? notes.filter((note) => note.tags.find((tag) => currentLabel.includes(tag)))
			: null;

	const sortedLabelPage = sortByDate(checkLabelPage(), sortBy);

	return (
		<div className={styles.labelNotes}>
			<div className={`input-container ${styles.inputContainer}`}>
				<input type="text" id="search" name="search" placeholder="Search Notes ..." />
				<i className="fa-solid fa-magnifying-glass"></i>
			</div>
			<div className={styles.labelFilter}>
				<div className="radio-container">
					<input
						type="radio"
						name="example input"
						id="newest"
						value="highToLow"
						onChange={(e) => setSortBy(e.target.value)}
					/>
					<label htmlFor="newest">Newest First</label>
				</div>
				<div className="radio-container">
					<input
						type="radio"
						name="example input"
						id="oldest"
						value="lowToHigh"
						onChange={(e) => setSortBy(e.target.value)}
					/>
					<label htmlFor="oldest">Oldest First</label>
				</div>
			</div>
			{location.pathname.includes('home') ||
			location.pathname.includes('archive') ||
			location.pathname.includes('trash')
				? sortedCurrPage.length > 0
					? sortedCurrPage.map((note) => <NoteCard key={note._id} {...note} />)
					: null
				: sortedLabelPage.length > 0
				? sortedLabelPage.map((note) => (
						<NoteCard key={note._id} {...note} currentLabel={currentLabel} />
				  ))
				: null}
		</div>
	);
};

export { LabelNotes };
