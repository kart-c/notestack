import { useState, useEffect } from 'react';
import HtmlParser from 'react-html-parser/lib/HtmlParser';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useArchive, useAuth, useNotes, useTrash } from '../../Context';
import { addNewNote, archiveDelete, archiveNote, deleteNote, unarchiveNote } from '../../Services';
import { bgColorCheck, chipColor } from '../../Utils';
import { Editor } from '../Editor/Editor';
import { FooterNav } from '../../Components';
import styles from './SingleNote.module.css';

const SingleNote = () => {
	const [isEditable, setIsEditable] = useState(false);
	const params = useParams();
	const navigate = useNavigate();
	const location = useLocation();
	const { trashState, trashDispatch } = useTrash();
	const {
		notesState: { notes },
		notesDispatch,
	} = useNotes();
	const {
		authState: { token },
	} = useAuth();
	const {
		archiveState: { archives },
		archiveDispatch,
	} = useArchive();

	useEffect(() => {
		setIsEditable(false);
	}, [params._id]);

	const currentNote = notes.find((note) => note._id === params._id);

	const archivedNote = archives.find((archive) => archive._id === params._id);

	const trashedNote = trashState.trash.find((trash) => trash._id === params._id);

	const currentLabel = notes.find((note) => note._id === params._id);

	const checkCurrPage = () =>
		location.pathname.includes('home')
			? currentNote
			: location.pathname.includes('archive')
			? archivedNote
			: location.pathname.includes('trash')
			? trashedNote
			: currentLabel;

	const archiveHandler = async () => {
		try {
			const response = await archiveNote(currentNote, token, currentNote._id);
			if (response.status === 201) {
				navigate(-1);
				notesDispatch({ type: 'ARCHIVE_NOTE', payload: response.data.notes });
				archiveDispatch({ type: 'ADD_TO_ARCHIVE', payload: response.data.archives });
			} else {
				console.error('ERROR: ', response);
			}
		} catch (error) {
			console.error('ERROR: ', error);
		}
	};

	const unarchiveHandler = async () => {
		try {
			const response = await unarchiveNote(archivedNote._id, token);
			if (response.status === 200) {
				navigate('/archive');
				notesDispatch({ type: 'UNARCHIVE_NOTE', payload: response.data.notes });
				archiveDispatch({ type: 'REMOVE_FROM_ARCHIVE', payload: response.data.archives });
			} else {
				console.error('ERROR: ', response);
			}
		} catch (error) {
			console.error('ERROR: ', error);
		}
	};

	const trashHandler = async () => {
		const note = location.pathname.includes('home') ? currentNote : archivedNote;
		if (note === currentNote) {
			try {
				const response = await deleteNote(note._id, token);
				if (response.status === 200) {
					setIsEditable(true);
					navigate('/home');
					notesDispatch({ type: 'ADD_TO_TRASH', payload: response.data.notes });
					trashDispatch({ type: 'ADD_TO_TRASH', payload: note });
				} else {
					console.error('ERROR: ', response);
				}
			} catch (error) {
				console.error('ERROR: ', error);
			}
		} else {
			try {
				const response = await archiveDelete(token, note._id);
				if (response.status === 200) {
					navigate('/archive');
					archiveDispatch({ type: 'REMOVE_FROM_ARCHIVE', payload: response.data.archives });
					trashDispatch({ type: 'ADD_TO_TRASH', payload: note });
				} else {
					console.error('ERROR: ', response);
				}
			} catch (error) {
				console.error('ERROR: ', error);
			}
		}
	};

	const restoreNoteHandler = async () => {
		try {
			const response = await addNewNote(trashedNote, token);
			if (response.status === 201) {
				navigate('/trash');
				trashDispatch({ type: 'RESTORE_FROM_TRASH', payload: trashedNote._id });
				notesDispatch({ type: 'RESTORE_FROM_TRASH', payload: response.data.notes });
			} else {
				console.error('ERROR: ', response);
			}
		} catch (error) {
			console.error('ERROR: ', error);
		}
	};

	const deleteHandler = () => {
		trashDispatch({ type: 'DELETE_FROM_TRASH', payload: trashedNote._id });
		navigate('/trash');
	};

	const getDate = (date) => {
		const newDate = new Date(date).toLocaleString('en-In', { day: '2-digit' });
		const month = new Date(date).toLocaleString('en-In', { month: 'short' });
		const year = new Date(date).getFullYear();
		const time = new Date(date).toLocaleTimeString('en-In');
		return `${newDate} ${month} ${year} ${time}`;
	};

	return (
		<>
			{isEditable ? (
				<Editor
					setIsEditable={setIsEditable}
					title={currentNote && currentNote.title}
					content={currentNote && currentNote.content}
					bgCard={currentNote && currentNote.bgColor}
					tags={currentNote && currentNote.tags}
					notePriority={currentNote && currentNote.priority}
				/>
			) : (
				<div className={styles.noteContainer}>
					<article
						className={` ${styles.note}  ${
							checkCurrPage() && bgColorCheck(checkCurrPage().bgColor)
						}`}
					>
						<div className={styles.noteTitle}>
							{checkCurrPage() && HtmlParser(checkCurrPage().title)}
							<div className={styles.btnContainer}>
								{location.pathname.includes('trash') ||
								location.pathname.includes('archive') ? null : (
									<button title="edit" onClick={() => setIsEditable(true)}>
										<i className="fa-solid fa-pen-to-square"></i>
									</button>
								)}
								{location.pathname.includes('trash') ? null : (
									<button
										title={location.pathname.includes('home') ? 'archive' : 'unarchive'}
										onClick={
											location.pathname.includes('archive') ? unarchiveHandler : archiveHandler
										}
									>
										<i className="fa-solid fa-box-archive"></i>
									</button>
								)}
								{location.pathname.includes('trash') ? (
									<button onClick={restoreNoteHandler}>
										<i className="fa-solid fa-rotate-left"></i>
									</button>
								) : null}
								<button
									title={location.pathname.includes('trash') ? 'DELETE' : 'trash'}
									onClick={location.pathname.includes('trash') ? deleteHandler : trashHandler}
								>
									<i
										className={`fa-solid fa-trash-can ${
											location.pathname.includes('trash') ? styles.trash : null
										}`}
									></i>
								</button>
							</div>
						</div>
						<small>{checkCurrPage() && getDate(checkCurrPage().date)}</small>

						<div className={styles.chipContainer}>
							{checkCurrPage() && checkCurrPage().tags?.length > 0
								? checkCurrPage().tags.map((label) => (
										<span
											className={`${styles.chip}  ${chipColor(
												bgColorCheck(checkCurrPage().bgColor)
											)}`}
											key={label}
										>
											{label}
										</span>
								  ))
								: null}
						</div>
						<div className={styles.noteContent}>
							{checkCurrPage() && HtmlParser(checkCurrPage().content)}
						</div>
					</article>
					<FooterNav />
				</div>
			)}
		</>
	);
};

export { SingleNote };
