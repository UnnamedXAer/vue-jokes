var alertPanel = Vue.component('alert-panel', {
	template: `#tmpl-alert-panel`,
	props: {
		type: String,
		msg: String
	}
});

var JokeComponent = {
	props: {
		joke: Object,
		required: true
	},
	template: `#tmpl-joke`
};

var JokesComponent = {
	components: {
		'joke-card': JokeComponent
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
