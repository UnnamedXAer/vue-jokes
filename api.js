function fetchJokes() {
	// if (window.forceFetch !== true && Vue.config.devtools) {
	// 	return new Promise((resolve) => {
	// 		setTimeout(() => {
	// 			resolve([
	// 				{
	// 					id: 1231,
	// 					joke:
	// 						'Chuck Norris does not have to answer the phone. His beard picks up the incoming electrical impulses and translates them into audible sound.\n' +
	// 						new Date().toISOString()
	// 				},
	// 				{
	// 					id: 1232,
	// 					joke:
	// 						'Chuck Norris was the original sculptor of Mount Rushmore. He completed the entire project using only a bottle opener and a drywall trowel.\n' +
	// 						new Date().toISOString()
	// 				}
	// 			]);
	// 		}, 20);
	// 	});
	// }

	return fetch('https://api.icndb.com/jokes/random/2')
		.then((res) => res.json())
		.then((json) => {
			if (json.type !== 'success') {
				throw new Error('response json type is not success\n');
			}

			if (!Array.isArray(json.value) || json.value.length < 2) {
				throw new Error('incorrect response in jokes request');
			}

			return json.value;
		})
		.catch((err) => {
			console.log(err);
			throw new Error(
				'Sadly 😥, we could not get the jokes. Please try again later.'
			);
		});
}
