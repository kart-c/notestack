export const searchNotes = (notes, value) => {
	if (notes) return notes.filter((note) => note.title.toLowerCase().includes(value.toLowerCase()));
};
