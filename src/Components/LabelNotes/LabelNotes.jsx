import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useArchive, useLabel, useNotes, useTrash, useFooterNav } from '../../Context';
import { priorityFilter, searchNotes, sortByDate } from '../../Utils';
import { NoteCard } from '../NoteCard/NoteCard';
import styles from './LabelNotes.module.css';

const LabelNotes = () => {
	const [sortBy, setSortBy] = useState('');
	const [priority, setPriority] = useState('');
	const [searchValue, setSearchValue] = useState('');
	const location = useLocation();
	const navigate = useNavigate();

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

	const { footerNav, setFooterNav } = useFooterNav();

	const checkCurrPage = () =>
		location.pathname.includes('home')
			? notes
			: location.pathname.includes('archive')
			? archives
			: trash;

	const filteredCurrPage = priorityFilter(checkCurrPage(), priority);

	const sortedCurrPage = sortByDate(filteredCurrPage, sortBy);

	const searchedCurrPage = searchNotes(sortedCurrPage, searchValue);

	const locationArr = location.pathname.split('/');

	const currentLabel = labels.find((label) => locationArr[1] === label);

	const checkLabelPage = () =>
		currentLabel
			? notes.filter((note) => note.tags.find((tag) => currentLabel.includes(tag)))
			: null;

	const filteredLabelPage = priorityFilter(checkLabelPage(), priority);

	const sortedLabelPage = sortByDate(filteredLabelPage, sortBy);

	const searchedLabelPage = searchNotes(sortedLabelPage, searchValue);

	const newNoteBtnHandler = () => {
		setFooterNav((prev) => ({ ...prev, labelNotes: false }));
		navigate('/home');
	};

	return (
		<>
			<div
				className={footerNav.labelNotes ? styles.backdrop : ''}
				onClick={() => setFooterNav((prev) => ({ ...prev, labelNotes: false }))}
			></div>
			<div
				className={`${styles.labelNotes} ${footerNav.labelNotes ? styles.mobileLabelNotes : ''}`}
			>
				<div className={`input-container ${styles.inputContainer}`}>
					<input
						type="text"
						id="search"
						name="search"
						placeholder="Search Notes by Title..."
						autoComplete="off"
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
					/>
					<i className="fa-solid fa-magnifying-glass"></i>
				</div>
				<div className={styles.labelFilter}>
					<button
						className={`btn btn-primary ${styles.sortBtn}`}
						onClick={() => setSortBy('lowToHigh')}
					>
						Oldest First
					</button>
					<button
						className={`btn btn-primary ${styles.sortBtn}`}
						onClick={() => setSortBy('highToLow')}
					>
						Newest First
					</button>
				</div>
				<div className={styles.priority}>
					<select
						name="priority"
						id="priority"
						value={priority}
						onChange={(e) => setPriority(e.target.value)}
					>
						<option value="">Default</option>
						<option value="low">Low</option>
						<option value="high">High</option>
					</select>
				</div>
				{location.pathname.includes('home') ||
				location.pathname.includes('archive') ||
				location.pathname.includes('trash') ? (
					searchedCurrPage.length > 0 ? (
						<>
							<div className={styles.allNotes}>
								{searchedCurrPage.map((note) => (
									<NoteCard key={note._id} {...note} />
								))}
							</div>
						</>
					) : null
				) : searchedLabelPage.length > 0 ? (
					<>
						<div className={styles.allNotes}>
							{searchedLabelPage.map((note) => (
								<NoteCard key={note._id} {...note} currentLabel={currentLabel} />
							))}
						</div>
					</>
				) : null}
				<button className={`btn btn-primary ${styles.newNoteBtn}`} onClick={newNoteBtnHandler}>
					Add New Note
				</button>
			</div>
		</>
	);
};

export { LabelNotes };
