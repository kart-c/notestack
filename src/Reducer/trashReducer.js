export const trashReducer = (state, { type, payload }) => {
	console.log(payload);
	switch (type) {
		case 'ADD_TO_TRASH':
			console.log({ ...state, trash: [...state.trash, payload] });
			return { ...state, trash: [...state.trash, payload] };

		default:
			throw new Error('NO CASE DEFINED IN NOTES REDUCER');
	}
};
