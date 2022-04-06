export const authReducer = (state, action) => {
	const { payload } = action;
	switch (action.type) {
		case 'AUTH':
			return {
				...state,
				token: payload.encodedToken,
				user: payload.foundUser ? payload.foundUser : payload.createdUser,
			};

		case 'LOGOUT':
			return { ...state, token: '', user: '' };

		default:
			throw new Error('CASE NOT DEFINED IN AUTH REDUCER');
	}
};
