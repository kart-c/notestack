import axios from 'axios';

export const addNewNote = async (note, token) => {
	const response = await axios.post(
		'/api/notes',
		{ note },
		{
			headers: { authorization: token },
		}
	);
	return response;
};
