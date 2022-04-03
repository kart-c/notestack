export const labelReducer = (state, { type, payload }) => {
	switch (type) {
		case 'ADD_NEW_NOTE':
			return { ...state, labels: [...state.labels, payload] };

		default:
			throw new Error('NO CASE DEFINED IN LABEL REDUCER');
	}
};
