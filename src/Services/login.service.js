import axios from 'axios';

export const loginService = async (userData, requestType) => {
	const response = await axios.post(`/api/auth/${requestType}`, userData);
	return response;
};
