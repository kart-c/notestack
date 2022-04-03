export const trashReducer = (state, { type, payload }) => {
	switch (type) {
		case 'ADD_TO_TRASH':
			return { ...state, trash: [...state.trash, payload] };

		case 'RESTORE_FROM_TRASH':
			const trashAfterRestore = state.trash.filter((restored) => restored._id !== payload);
			return { ...state, trash: trashAfterRestore };

		case 'DELETE_FROM_TRASH':
			const trashAfterDelete = state.trash.filter((restored) => restored._id !== payload);
			return { ...state, trash: trashAfterDelete };

		default:
			throw new Error('NO CASE DEFINED IN NOTES REDUCER');
	}
};
