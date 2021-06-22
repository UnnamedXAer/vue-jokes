function updateJokeImgs(idx) {
	idx = idx % 100;

	document.documentElement.style.setProperty(
		'--img0',
		`url('https://random.imagecdn.app/${400 + idx}/${400 + idx}')`
	);
	document.documentElement.style.setProperty(
		'--img1',
		`url('https://random.imagecdn.app/${400 + idx}/${400 + idx + 1}')`
	);
}
