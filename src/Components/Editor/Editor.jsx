import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import { contentModules, titleModules } from './quill.module';
import 'react-quill/dist/quill.snow.css';
import { addNewNote } from '../../Services';
import { useAuth, useNotes } from '../../Context';
import { bgColorCheck } from '../../Utils';
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
		console.log(newNote.title);
		if (newNote.content) {
			const noteTitle = (title) =>
				title === '<p><br></p>' || !title.length ? '<p>My Note</p>' : title;
			const note = { ...newNote, title: noteTitle(newNote.title), bgColor };
			console.log(note);
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
				className={`${styles.quill} ${bgColorCheck(bgColor)}`}
				theme="snow"
				value={newNote.title}
				onChange={(e) => setNewNote((prev) => ({ ...prev, title: e }))}
				modules={titleModules}
			/>
			<h3 className={styles.editorTitle}>Content</h3>
			<ReactQuill
				className={`${styles.quill} ${bgColorCheck(bgColor)}`}
				theme="snow"
				value={newNote.content}
				onChange={(e) => setNewNote((prev) => ({ ...prev, content: e }))}
				modules={contentModules}
			/>
			<div className={styles.colorContainer}>
				<span>
					<i className="fa-solid fa-palette"></i>
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
					Clear
				</button>
			</div>
			<button className={`btn btn-primary ${styles.btn}`} onClick={newNoteHandler}>
				Submit
			</button>
		</section>
	);
};

export { Editor };
