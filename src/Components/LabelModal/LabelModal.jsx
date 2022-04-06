import { useState, useRef, useEffect } from 'react';
import { useLabel } from '../../Context';
import { Backdrop } from '../Backdrop/Backdrop';
import styles from './LabelModal.module.css';

const LabelModal = ({ setLabelModal }) => {
	const [newLabel, setNewLabel] = useState('');
	const inputRef = useRef();

	const {
		labelState: { labels },
		labelDispatch,
	} = useLabel();

	useEffect(() => {
		inputRef.current.focus();
	}, []);

	const newLabelHandler = () => {
		if (newLabel) {
			if (labels.some((label) => label === newLabel)) {
				console.log('label already present');
				alert('Label already exists');
				setLabelModal(false);
				setNewLabel('');
			} else {
				labelDispatch({ type: 'ADD_NEW_NOTE', payload: newLabel });
				setLabelModal(false);
				setNewLabel('');
			}
		}
	};

	return (
		<>
			<Backdrop setLabelModal={setLabelModal} />
			<div className={styles.labelModal}>
				<div className="input-container">
					<label htmlFor="label">Add new Label</label>
					<input
						ref={inputRef}
						type="text"
						id="label"
						name="label"
						placeholder="Travel"
						value={newLabel}
						onChange={(e) => setNewLabel(e.target.value.trim())}
					/>
				</div>
				<button className="btn btn-info btn-round" onClick={newLabelHandler}>
					Add
				</button>
			</div>
		</>
	);
};

export { LabelModal };
