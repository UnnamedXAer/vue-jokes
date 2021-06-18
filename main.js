var alertPanel = Vue.component('alert-panel', {
	template: `#tmpl-alert-panel`,
	props: {
		type: String,
		msg: String
	}
});

var spinner = Vue.component('loading-indicator', {
	template: '#tmpl-loading-indicator'
});

var svgArrowUp = Vue.component('svg-arrow-up', {
	template: '#tmpl-svg-arrow-up'
});

var JokeActionBtn = {
	template: '#tmpl-joke-action-btn',
	props: {
		disabled: Boolean
	}
};

var JokeComponent = {
	props: {
		joke: { type: Object, required: true },
		accepted: Boolean
	},
	template: '#tmpl-joke',
	watch:{
		accepted(val){
			console.log("accepted", val, arguments);
		}
	}
};

var JokesComponent = {
	components: {
		'action-btn': JokeActionBtn,
		'joke-card': JokeComponent
	},
	data() {
		return {
			jokes: [],
			nextJokes: null,
			loading: false,
			fetchError: null,
			acceptedJokeIdx: -1,
			fetchingNext: false
		};
	},
	computed: {
		actionsDisabled() {
			const disabled =
				this.loading ||
				this.fetchError !== null ||
				this.fetchingNext ||
				this.jokes.length < 2 ||
				this.acceptedJokeIdx !== -1;

			return disabled;
		}
	},
	template: '#tmpl-jokes',
	mounted() {
		this.loading = true;
		fetchJokes()
			.then((jokes) => (this.jokes = jokes))
			.catch((err) => (this.fetchError = err))
			.finally(() => {
				this.loading = false;
			});
	},
	methods: {
		acceptJoke(idx) {
			if (this.actionsDisabled) {
				return;
			}
			console.log('joke accepted: ', idx);
			this.acceptedJokeIdx = idx;
			Promise.all([this.acceptAnimationTimeout(), this.getNextJokes()])
				.then((results) => {
					const nextJokes = results[1];
					if (!Array.isArray(nextJokes) || nextJokes.length < 2) {
						throw new Error('Sorry, could not fetch next jokes 😓');
					}
					this.jokes = [...nextJokes];
					this.acceptedJokeIdx = -1;
				})
				.catch((err) => {
					this.fetchError = err;
				})
				.finally(() => {
					this.fetchingNext = false;
				});
		},

		getNextJokes() {
			this.fetchingNext = true;
			return fetchJokes();
		},

		acceptAnimationTimeout() {
			return new Promise((resolve) => {
				setTimeout(() => {
					this.acceptedJokeIdx = -1;
					resolve();
				}, 500);
			});
		}
	}
};

var vm = new Vue({
	el: '#root',
	components: {
		jokes: JokesComponent
	},
	data: {
		title: 'Vue - Jokes 🤣'
	},
	watch: {
		title() {
			document.title = this.title;
		}
	},
	created() {
		document.title = this.title;
	}
});
