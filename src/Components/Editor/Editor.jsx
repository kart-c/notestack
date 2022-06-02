import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { contentModules, titleModules } from './quill.module';
import { addNewNote, editNote } from '../../Services';
import { useAuth, useLabel, useNotes } from '../../Context';
import { bgColorCheck, chipColor } from '../../Utils';
import { useParams } from 'react-router-dom';
import { LabelModal, FooterNav } from '../../Components';
import styles from './Editor.module.css';
import 'react-quill/dist/quill.snow.css';
import './Quill.css';

const Editor = ({
	setIsEditable,
	title = '',
	content = '',
	bgCard = '',
	tags = [],
	notePriority = '',
}) => {
	const [newNote, setNewNote] = useState({ title, content });
	const [bgColor, setBgColor] = useState(bgCard);
	const [loading, setLoading] = useState(false);
	const [labelModal, setLabelModal] = useState(false);
	const [noteLabels, setNoteLabels] = useState(tags);
	const [priority, setPriority] = useState(notePriority);

	const {
		authState: { token },
	} = useAuth();

	const { notesState, notesDispatch } = useNotes();

	const {
		labelState: { labels },
	} = useLabel();

	const params = useParams();

	const currentNote = notesState.notes.find((note) => note._id === params._id);

	const updateCardHandler = async () => {
		const date = new Date().toLocaleString();
		const note = { ...newNote, bgColor, date, tags: noteLabels, priority };
		try {
			setLoading(true);
			const response = await editNote(note, token, currentNote._id);
			if (response.status === 201) {
				notesDispatch({ type: 'UPDATE_NOTE', payload: response.data.notes });
				setLoading(false);
				setIsEditable(false);
			} else {
				setLoading(false);
				console.log('ERROR: ', response);
			}
		} catch (error) {
			setLoading(false);
			console.log('ERROR: ', error);
		}
	};

	const newNoteHandler = async () => {
		const date = new Date().toLocaleString();
		if (newNote.content) {
			const noteTitle = (title) =>
				title === '<p><br></p>' || !title.length ? '<p>My Note</p>' : title;
			const note = {
				...newNote,
				title: noteTitle(newNote.title),
				bgColor,
				date,
				tags: noteLabels,
				priority,
			};
			try {
				setLoading(true);
				const response = await addNewNote(note, token);
				if (response.status === 201) {
					setNewNote((prev) => ({ ...prev, title: '', content: '' }));
					setBgColor('');
					setPriority('');
					setNoteLabels([]);
					notesDispatch({ type: 'NEW_NOTE', payload: response.data.notes });
					setLoading(false);
				} else {
					setLoading(false);
					console.log('ERROR: ', response);
				}
			} catch (error) {
				setLoading(false);
				console.error('ERROR: ', error);
			}
		} else {
			alert('Enter note content');
		}
	};

	const addLabelHandler = (e) => {
		const isPresent = noteLabels.find((label) => label === e.target.value);
		setNoteLabels((prev) => (isPresent ? [...prev] : [...prev, e.target.value]));
	};

	const removeLabelHandler = (labelName) => {
		const newLabels = noteLabels.filter((label) => label !== labelName);
		setNoteLabels(newLabels);
	};

	return (
		<>
			<section className={styles.editorSection}>
				{labelModal ? <LabelModal setLabelModal={setLabelModal} /> : null}
				<h3 className={styles.editorTitle}>Title</h3>
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
				<div className={styles.chipContainer}>
					{noteLabels.length > 0
						? noteLabels.map((label) => (
								<span className={`${styles.chip}  ${chipColor(bgColorCheck(bgColor))}`} key={label}>
									{label}
									<button onClick={() => removeLabelHandler(label)}>
										<i className="fas fa-times-circle"></i>
									</button>
								</span>
						  ))
						: null}
				</div>
				<div className={styles.labelDropdown}>
					<span>
						<i className="fa-solid fa-tag"></i>
					</span>
					<select name="label" id="label" onChange={addLabelHandler} value="">
						<option value="label">Select label</option>
						{labels.map((label) => (
							<option value={label} key={label}>
								{label}
							</option>
						))}
					</select>
					<button className="btn btn-primary" onClick={() => setLabelModal(true)}>
						Add New Label
					</button>
				</div>
				<div className={styles.priorityDropdown}>
					<span>
						<i className="fa-solid fa-star"></i>
					</span>
					<select
						name="priority"
						id="priority"
						onChange={(e) => setPriority(e.target.value)}
						value={priority}
					>
						<option value="">Default</option>
						<option value="low">Low</option>
						<option value="high">High</option>
					</select>
				</div>
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
				<button
					className={`btn btn-primary ${styles.btn}`}
					onClick={title && content ? updateCardHandler : newNoteHandler}
					disabled={loading}
				>
					Submit
				</button>
			</section>
			<FooterNav />
		</>
	);
};

export { Editor };
