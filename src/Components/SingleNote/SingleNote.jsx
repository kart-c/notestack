import { useState, useEffect } from 'react';
import HtmlParser from 'react-html-parser/lib/HtmlParser';
import { useNavigate, useParams } from 'react-router-dom';
import { useArchive, useAuth, useNotes } from '../../Context';
import { archiveNote } from '../../Services';
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

	const {
		authState: { token },
	} = useAuth();

	const { archiveState, archiveDispatch } = useArchive();
	useEffect(() => {
		setIsEditable(false);
	}, [params._id]);

	const currentNote = notes.find((note) => note._id === params._id);

	const archiveHandler = async () => {
		try {
			const response = await archiveNote(currentNote, token, currentNote._id);
			if (response.status === 201) {
				navigate('/home');
				console.log(response);
				notesDispatch({ type: 'ARCHIVE_NOTE', payload: response.data.notes });
				archiveDispatch({ type: 'ADD_TO_ARCHIVE', payload: response.data.archives });
			} else {
				console.error('ERROR: ', response);
			}
		} catch (error) {
			console.error('ERROR: ', error);
		}
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
					<article className={` ${styles.note} ${bgColorCheck(currentNote.bgColor)}`}>
						<div className={styles.noteTitle}>
							{HtmlParser(currentNote.title)}
							<div className={styles.btnContainer}>
								<button title="edit" className={styles.editBtn} onClick={() => setIsEditable(true)}>
									<i className="fa-solid fa-pen-to-square"></i>
								</button>
								<button title="pin">
									<i className="fa-solid fa-thumbtack"></i>
								</button>
								<button title="archive" onClick={archiveHandler}>
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
			)}
		</>
	);
};

export { SingleNote };
