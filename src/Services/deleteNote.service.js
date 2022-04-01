import axios from 'axios';

export const deleteNote = async (_id, token) => {
	const response = await axios.delete(`/api/notes/${_id}`, {
		headers: { authorization: token },
	});
	return response;
};
