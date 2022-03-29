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
	const [bgColor, setBgColor] = useState('');

	const {
		authState: { token },
	} = useAuth();

	const { notesState, notesDispatch } = useNotes();

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

	return (
		<section className={styles.editorSection}>
			<h3 className={styles.editorTitle}>New Note Title</h3>
			<ReactQuill
				theme="snow"
				value={newNote.title}
				onChange={(e) => setNewNote((prev) => ({ ...prev, title: e }))}
				modules={titleModules}
			/>
			<h3 className={styles.editorTitle}>Content</h3>
			<ReactQuill
				style={{ backgroundColor: bgColor }}
				theme="snow"
				value={newNote.content}
				onChange={(e) => setNewNote((prev) => ({ ...prev, content: e }))}
				modules={contentModules}
			/>
			<div className={styles.colorContainer}>
				<span>
					<i className="fa-solid fa-palette"></i> Select background
				</span>
				<div className="radio-container">
					<input
						type="radio"
						name="color input"
						id="color-input-1"
						value="red"
						onChange={(e) => setBgColor(e.target.value)}
					/>
					<label htmlFor="color-input-1">Color 1</label>
				</div>
				<div className="radio-container">
					<input
						type="radio"
						name="color input"
						id="color-input-2"
						value="yellow"
						onChange={(e) => setBgColor(e.target.value)}
					/>
					<label htmlFor="color-input-2">Color 2</label>
				</div>
				<div className="radio-container">
					<input
						type="radio"
						name="color input"
						id="color-input-3"
						value="black"
						onChange={(e) => setBgColor(e.target.value)}
					/>
					<label htmlFor="color-input-3">Color 3</label>
				</div>
				<div className="radio-container">
					<input
						type="radio"
						name="color input"
						id="color-input-4"
						value="blue"
						onChange={(e) => setBgColor(e.target.value)}
					/>
					<label htmlFor="color-input-4">Color 3</label>
				</div>
				<button
					className={` btn btn-primary ${styles.clearBtn}`}
					onClick={() => setBgColor('#232b4f')}
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
