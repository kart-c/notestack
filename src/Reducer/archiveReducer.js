export const archiveReducer = (state, { type, payload }) => {
	switch (type) {
		case 'ADD_TO_ARCHIVE':
			return { ...state, archives: payload };

		default:
			throw new Error('NO CASE DEFINED IN ARCHIVE REDUCER');
	}
};
