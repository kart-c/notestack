import axios from 'axios';

export const unarchiveNote = async (_id, token) => {
	const response = await axios.post(
		`/api/archives/restore/${_id}`,
		{},
		{
			headers: { authorization: token },
		}
	);
	console.log(response);
	return response;
};
