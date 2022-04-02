import { useState, useEffect } from 'react';
import HtmlParser from 'react-html-parser/lib/HtmlParser';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useArchive, useAuth, useNotes, useTrash } from '../../Context';
import { addNewNote, archiveNote, deleteNote, unarchiveNote } from '../../Services';
import { bgColorCheck } from '../../Utils';
import { Editor } from '../Editor/Editor';
import styles from './SingleNote.module.css';

const SingleNote = () => {
	const [isEditable, setIsEditable] = useState(false);

	const {
		notesState: { notes },
		notesDispatch,
	} = useNotes();

	const params = useParams();

	const navigate = useNavigate();

	const location = useLocation();

	const { trashState, trashDispatch } = useTrash();

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

	const checkCurrPage = () =>
		location.pathname.includes('home')
			? currentNote
			: location.pathname.includes('archive')
			? archivedNote
			: trashedNote;

	const archiveHandler = async () => {
		try {
			const response = await archiveNote(currentNote, token, currentNote._id);
			if (response.status === 201) {
				navigate('/home');
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
		try {
			const response = await deleteNote(currentNote._id, token);
			if (response.status === 200) {
				navigate('/home');
				trashDispatch({ type: 'ADD_TO_TRASH', payload: currentNote });
				notesDispatch({ type: 'ADD_TO_TRASH', payload: response.data.notes });
			} else {
				console.error('ERROR: ', response);
			}
		} catch (error) {
			console.error('ERROR: ', error);
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

	return (
		<>
			{isEditable ? (
				<Editor
					title={currentNote.title}
					content={currentNote.content}
					bgCard={currentNote.bgColor}
					setIsEditable={setIsEditable}
				/>
			) : (
				<div className={styles.noteContainer}>
					<article className={` ${styles.note} ${bgColorCheck(checkCurrPage().bgColor)}`}>
						<div className={styles.noteTitle}>
							{HtmlParser(checkCurrPage().title)}
							<div className={styles.btnContainer}>
								{location.pathname.includes('home') ? (
									<button
										title="edit"
										className={styles.editBtn}
										onClick={() => setIsEditable(true)}
									>
										<i className="fa-solid fa-pen-to-square"></i>
									</button>
								) : null}
								{location.pathname.includes('home') ? (
									<button title="pin">
										<i className="fa-solid fa-thumbtack"></i>
									</button>
								) : null}

								{location.pathname.includes('trash') ? null : (
									<button
										title={location.pathname.includes('home') ? 'archive' : 'unarchive'}
										onClick={location.pathname.includes('home') ? archiveHandler : unarchiveHandler}
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
						<small>{checkCurrPage().date}</small>
						<div className={`${styles.chipContainer} ${bgColorCheck(checkCurrPage().bgColor)}`}>
							<span className={styles.chip}>
								Nature <i className="fas fa-times-circle"></i>
							</span>
						</div>
						<div className={styles.noteContent}>{HtmlParser(checkCurrPage().content)}</div>
					</article>
				</div>
			)}
		</>
	);
};

export { SingleNote };
