function fetchJokes() {
	return fetch('http://api.icndb.com/jokes/random/2')
		.then((res) => res.json())
		.then((json) => {
			if (json.type !== 'success') {
				throw new Error(
					'Sadly 😥, we could not get the jokes. Please try again later.'
				);
			}

			return json.value;
		});
}
