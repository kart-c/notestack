import axios from 'axios';

export const archiveDelete = async (token, _id) => {
	const response = await axios.delete(`/api/archives/delete/${_id}`, {
		headers: { authorization: token },
	});

	return response;
};
