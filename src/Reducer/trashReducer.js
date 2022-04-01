export const trashReducer = (state, { type, payload }) => {
	switch (type) {
		case 'ADD_TO_TRASH':
			return { ...state, trash: [...state.trash, payload] };

		default:
			throw new Error('NO CASE DEFINED IN NOTES REDUCER');
	}
};
