import axios from 'axios';

export const getNotes = (token) =>
	axios.get('/api/notes', {
		headers: { authorization: token },
	});
