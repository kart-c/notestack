import axios from 'axios';

export const editNote = async (note, token, _id) => {
	const response = await axios.post(
		`/api/notes/${_id}`,
		{
			note,
		},
		{ headers: { authorization: token } }
	);
	return response;
};
