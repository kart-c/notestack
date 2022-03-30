import axios from 'axios';

export const archiveNote = (note, token, _id) => {
	const response = axios.post(
		`/api/notes/archives/${_id}`,
		{
			note,
		},
		{ headers: { authorization: token } }
	);
	return response;
};
