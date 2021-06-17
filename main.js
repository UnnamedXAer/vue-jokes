var alertPanel = Vue.component('alert-panel', {
	template: `#tmpl-alert-panel`,
	props: {
		type: String,
		msg: String
	}
});

var svgArrowUp = Vue.component('svg-arrow-up', {
	template: '#tmpl-svg-arrow-up'
});

var JokesActionsBtn = {
	template: '#tmpl-jokes-actions-btn'
};

var JokesActions = {
	template: '#tmpl-jokes-actions',
	components: {
		'actions-btn': JokesActionsBtn
	}
};

var JokeComponent = {
	props: {
		joke: { type: Object, required: true },
		idx: Number
	},
	template: `#tmpl-joke`
};

var JokesComponent = {
	components: {
		'joke-card': JokeComponent,
		'joke-actions': JokesActions
	},
	data() {
		return {
			jokes: [],
			fetchError: null
		};
	},
	template: '#tmpl-jokes',
	mounted() {
		fetchJokes()
			.then((jokes) => (this.jokes = jokes))
			.catch((err) => (this.fetchError = err));
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
