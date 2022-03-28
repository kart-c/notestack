import React from 'react';
import styles from './Editor.module.css';

const Editor = () => {
	return (
		<div className={styles.editorSection}>
			<div className={styles.editor}>
				<h4>Note Title</h4>
				<p>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam iure non doloremque
					cupiditate! Adipisci in quasi laborum hic, reprehenderit labore debitis dolores sit
					explicabo tempore numquam, sunt perspiciatis impedit maiores!
				</p>
			</div>
		</div>
	);
};

export { Editor };
