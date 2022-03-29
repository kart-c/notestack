import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import { contentModules, titleModules } from './quill.module';
import 'react-quill/dist/quill.snow.css';
import { addNewNote } from '../../Services';
import { useAuth, useNotes } from '../../Context';
import styles from './Editor.module.css';
import './Quill.css';

const Editor = () => {
	const [newNote, setNewNote] = useState({ title: '', content: '' });
	const [bgColor, setBgColor] = useState('Gray');

	const {
		authState: { token },
	} = useAuth();

	const { notesDispatch } = useNotes();

	const newNoteHandler = async () => {
		if (newNote.content) {
			const note = { ...newNote, bgColor };
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

	const checkBg = (bgColor, styles) =>
		bgColor === 'purple'
			? styles.notePurple
			: bgColor === 'red'
			? styles.noteRed
			: bgColor === 'yellow'
			? styles.noteYellow
			: bgColor === 'green'
			? styles.noteYellow
			: bgColor === 'blue'
			? styles.noteBlue
			: styles.noteGray;

	return (
		<section className={styles.editorSection}>
			<h3 className={styles.editorTitle}>New Note Title</h3>
			<ReactQuill
				className={checkBg(bgColor, styles)}
				theme="snow"
				value={newNote.title}
				onChange={(e) => setNewNote((prev) => ({ ...prev, title: e }))}
				modules={titleModules}
			/>
			<h3 className={styles.editorTitle}>Content</h3>
			<ReactQuill
				className={checkBg(bgColor, styles)}
				theme="snow"
				value={newNote.content}
				onChange={(e) => setNewNote((prev) => ({ ...prev, content: e }))}
				modules={contentModules}
			/>
			<div className={styles.colorContainer}>
				<span>
					<i className="fa-solid fa-palette"></i> Select background
				</span>
				<select
					name="select-color"
					id="select-color"
					value={bgColor}
					onChange={(e) => setBgColor(e.target.value)}
				>
					<option value="gray" default>
						Gray
					</option>
					<option value="red">Red</option>
					<option value="yellow">Yellow</option>
					<option value="green">Green</option>
					<option value="blue">Blue</option>
					<option value="purple">Purple</option>
				</select>
				<button
					className={` btn btn-primary ${styles.clearBtn}`}
					onClick={() => setBgColor('gray')}
				>
					Clear Color
				</button>
			</div>
			<button className={`btn btn-primary ${styles.btn}`} onClick={newNoteHandler}>
				Submit
			</button>
		</section>
	);
};

export { Editor };
