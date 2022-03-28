import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { contentModules, titleModules } from './quill.module';
import 'react-quill/dist/quill.snow.css';
import { addNewNote } from '../../Services';
import { useAuth, useNotes } from '../../Context';
import styles from './Editor.module.css';
import './Quill.css';

const Editor = () => {
	const [noteTitle, setNoteTitle] = useState('');
	const [noteContent, setNoteContent] = useState('');

	const {
		authState: { token },
	} = useAuth();

	const { notesState, notesDispatch } = useNotes();

	const newNoteHandler = async () => {
		if (noteContent) {
			const note = { noteTitle, noteContent };
			try {
				const response = await addNewNote(note, token);
				if (response.status === 201) {
					notesDispatch({ type: 'NEW_NOTE', payload: response.data.notes });
				} else {
					console.log('ERROR: ', response);
				}
			} catch (error) {
				console.error('ERROR: ', error);
			}
		} else {
			alert('Enter note content');
		}
	};

	return (
		<section className={styles.editorSection}>
			<h3 className={styles.editorTitle}>New Note Title</h3>
			<ReactQuill
				theme="snow"
				value={noteTitle}
				onChange={(e) => setNoteTitle(e)}
				modules={titleModules}
			/>
			<h3 className={styles.editorTitle}>Content</h3>
			<ReactQuill
				theme="snow"
				value={noteContent}
				onChange={(e) => setNoteContent(e)}
				modules={contentModules}
			/>
			<button className={`btn btn-primary ${styles.btn}`} onClick={newNoteHandler}>
				Submit
			</button>
		</section>
	);
};

export { Editor };
