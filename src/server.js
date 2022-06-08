import { Server, Model, RestSerializer } from 'miragejs';
import {
	deleteFromArchivesHandler,
	getAllArchivedNotesHandler,
	restoreFromArchivesHandler,
} from './backend/controllers/ArchiveController';
import { loginHandler, signupHandler } from './backend/controllers/AuthController';
import {
	archiveNoteHandler,
	createNoteHandler,
	deleteNoteHandler,
	getAllNotesHandler,
	updateNoteHandler,
} from './backend/controllers/NotesController';
import { users } from './backend/db/users';

export function makeServer({ environment = 'development' } = {}) {
	const server = new Server({
		serializers: {
			application: RestSerializer,
		},
		environment,
		// TODO: Use Relationships to have named relational Data
		models: {
			user: Model,
			notes: Model,
		},

		seeds(server) {
			server.logging = false;
			users.forEach((item) =>
				server.create('user', {
					...item,
					notes: [
						{
							bgColor: 'purple',
							content:
								"<p>Gathered together from the cosmic reaches of the universe, here in this great Hall of Justice, are the most powerful forces of good ever assembled: <strong>Superman!</strong> <strong>Batman</strong> and <strong>Robin!</strong> <strong>Wonder Woman!</strong> Aquaman! And The Wonder Twins: Zan and Jayna, with their space monkey, Gleek! Dedicated to prove justice and peace for all mankind!</p><p>Enter at your peril, past the vaulted door. Impossible things will happen that the world's never seen before. In Dexter's laboratory lives the smartest boy you've ever seen, but Dee Dee blows his experiments to Smithereens! There's gloom and doom when things go boom in Dexter's lab!</p><p>Yogi Bear is smarter than the average bear, Yogi Bear is always in the ranger's hair. At a picnic table you will find him there, stuffing down more goodies than the average bear. He will sleep till noon but before it's dark, he'll have every picnic basket that's in Jellystone Park. Yogi has it better than a millionaire. That's because he's smarter than the average bear!</p>",
							date: new Date().toLocaleString(),
							title: '<p>Dummy Note</p>',
							_id: 'fa2eedf0-f4bf-4250-8932-182f61b59a62',
						},
						{
							bgColor: 'yellow',
							content:
								"<p>Making the world a better place, starts with one more smiling face. And Ronald's smile is just the thing, To make everybody sing! Put a smile on, put a smile on, everybody come on! Put a smile on!</p><p>Tell me why, I love you like I do. Tell me who, could stop my heart as much as you. Let's take each other's hand, as we jump into the final frontier. Mad about you baby, yeah, I'm mad about you. Whoo hoo hoo.</p><p>Baby if you've ever wondered, wondered what ever became of me. I'm living on the air in Cincinnati, Cincinnati WKRP. Got time and tired of packing and unpacking. Town to town, up and down the dial. Maybe you and me were never meant to be, But baby think of me once in a while. I'm in WKRP in Cincinnati.</p>",
							date: new Date().toLocaleString(),
							title: '<p>Dummy Note</p>',
							_id: '3de18364-f9b2-4b0f-a0be-058de4121efa',
						},
					],
					archives: [],
				})
			);
		},

		routes() {
			this.namespace = 'api';
			// auth routes (public)
			this.post('/auth/signup', signupHandler.bind(this));
			this.post('/auth/login', loginHandler.bind(this));

			// notes routes (private)
			this.get('/notes', getAllNotesHandler.bind(this));
			this.post('/notes', createNoteHandler.bind(this));
			this.post('/notes/:noteId', updateNoteHandler.bind(this));
			this.delete('/notes/:noteId', deleteNoteHandler.bind(this));
			this.post('/notes/archives/:noteId', archiveNoteHandler.bind(this));

			// archive routes (private)
			this.get('/archives', getAllArchivedNotesHandler.bind(this));
			this.post('/archives/restore/:noteId', restoreFromArchivesHandler.bind(this));
			this.delete('/archives/delete/:noteId', deleteFromArchivesHandler.bind(this));
		},
	});
	return server;
}
