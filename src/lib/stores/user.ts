import { gun } from '$lib/gun';
import { writable, type Readable } from 'svelte/store';

type UserState = {
	alias: string;
	id: string;
	user: any;
};

type UserStore = Readable<UserState | null> & {
	signUp: (a: string, p: string) => Promise<void>;
	signIn: (a: string, p: string) => Promise<void>;
	signOut: () => Promise<void>;
};

const userStore = (): UserStore => {
	const state = writable<UserState | null>(null);

	const setUser = (s: string) => {
		gun.get(s).on((d: any) => {
			state.set({ alias: d.alias, id: d.soul, user: d });
		});
	};

	// load user from session
	gun.user().recall({ sessionStorage: true });

	gun.on('auth', (u) => {
		console.log('auth', u);
		setUser('~' + u.pub);
	});

	return {
		subscribe: state.subscribe,

		signUp: async (alias, pass) => {
			gun.user().create(alias, pass, (ack: any) => {
				if (!ack.pub) return;

				setUser('~' + ack.pub);
			});
		},

		signIn: async (alias, pass) => {
			gun.user().auth(alias, pass, (ack: any) => {
				if (!ack.soul) return;
				setUser(ack.soul);
			});
		},

		signOut: async () => {
			gun.user().leave();
		}
	};
};

export const user = userStore();
