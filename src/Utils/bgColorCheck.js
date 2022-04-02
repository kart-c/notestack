export const bgColorCheck = (bgColor) => {
	switch (bgColor) {
		case 'purple':
			return 'note-purple';

		case 'red':
			return 'note-red';

		case 'yellow':
			return 'note-yellow';

		case 'green':
			return 'note-green';

		case 'blue':
			return 'note-blue';

		default:
			return 'note-gray';
	}
};
