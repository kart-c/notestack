export const chipColor = (bgColor) => {
	switch (bgColor) {
		case 'note-green':
			return 'chip-green';

		case 'note-red':
			return 'chip-red';

		case 'note-yellow':
			return 'chip-yellow';

		case 'note-blue':
			return 'chip-blue';

		case 'note-purple':
			return 'chip-purple';

		default:
			return 'chip-gray';
	}
};
