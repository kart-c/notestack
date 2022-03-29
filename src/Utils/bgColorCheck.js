export const bgColorCheck = (bgColor) =>
	bgColor === 'purple'
		? 'note-purple'
		: bgColor === 'red'
		? 'note-red'
		: bgColor === 'yellow'
		? 'note-yellow'
		: bgColor === 'green'
		? 'note-green'
		: bgColor === 'blue'
		? 'note-blue'
		: 'note-gray';
