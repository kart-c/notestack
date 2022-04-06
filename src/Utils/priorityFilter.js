export const priorityFilter = (notes, priority) =>
	notes ? notes.filter((note) => (priority === '' ? note : note.priority === priority)) : null;
