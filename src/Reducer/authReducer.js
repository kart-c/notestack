export const authReducer = (state, action) => {
	const { payload } = action;
	switch (action.type) {
		case 'AUTH':
			return { ...state, token: payload };

		default:
			throw new Error('CASE NOT DEFINED IN AUTH REDUCER');
	}
};
