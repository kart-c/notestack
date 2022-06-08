import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
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
		if (newLabel.trim()) {
			if (labels.some((label) => label === newLabel)) {
				toast.info(`${newLabel} already exists!`);
				setNewLabel('');
			} else {
				labelDispatch({ type: 'ADD_NEW_NOTE', payload: newLabel });
				setLabelModal(false);
				setNewLabel('');
			}
		} else {
			toast.warn('label cannot be empty');
			setNewLabel('');
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
						onChange={(e) => setNewLabel(e.target.value)}
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
