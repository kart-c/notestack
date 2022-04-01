export const trashReducer = (state, { type, payload }) => {
	switch (type) {
		case 'ADD_TO_TRASH':
			return { ...state, trash: [...state.trash, payload] };

		case 'REMOVE_FROM_TRASH':
			const restoredTrash = state.trash.filter((restored) => restored._id !== payload);
			return { ...state, trash: restoredTrash };

		default:
			throw new Error('NO CASE DEFINED IN NOTES REDUCER');
	}
};
