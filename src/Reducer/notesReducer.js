export const notesReducer = (state, action) => {
	const { payload } = action;
	switch (action.type) {
		case 'NEW_NOTE':
			return { ...state, notes: payload };

		case 'UPDATE_NOTE':
			return { ...state, notes: payload };

		case 'ARCHIVE_NOTE':
			return { ...state, notes: payload };

		case 'UNARCHIVE_NOTE':
			return { ...state, notes: payload };

		default:
			throw new Error('NO CASE DEFINED IN NOTES REDUCER');
	}
};
