export const sortByDate = (notes, sortBy) => {
	const getTime = (date) => new Date(date).getTime();
	if (sortBy === 'lowToHigh') {
		return [...notes].sort((note1, note2) => getTime(note1.date) - getTime(note2.date));
	}
	if (sortBy === 'highToLow') {
		return [...notes].sort((note1, note2) => getTime(note2.date) - getTime(note1.date));
	}
	return notes;
};
