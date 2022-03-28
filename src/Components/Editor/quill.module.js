export const titleModules = {
	toolbar: [[{ header: [2, false] }], ['underline', 'italic']],
	keyboard: {
		bindings: {
			enter: {
				key: 13,
				handler: function () {
					return false;
				},
			},
		},
	},
};

export const contentModules = {
	toolbar: [
		[{ header: [2, 3, false] }],
		['underline', 'italic', 'strike'],
		['blockquote', 'code-block'],
	],
};
