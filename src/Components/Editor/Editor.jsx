import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { contentModules, titleModules } from './quill.module';
import 'react-quill/dist/quill.snow.css';
import styles from './Editor.module.css';
import './Quill.css';

const Editor = () => {
	const [noteTitle, setNoteTitle] = useState('');
	const [noteContent, setNoteContent] = useState('');

	const newNoteHandler = () => {};

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
