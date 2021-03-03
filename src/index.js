function sleep(millis) {
	return new Promise((resolve) => setTimeout(resolve, millis));
}

function randomChain(rad, radius, centre) {
	let chain;
	do {
		chain = new Chain([
			{ length: rad / 5, speed: randomInt(-5, 5) },
			{ length: rad / 5, speed: randomInt(-5, 5) },
			{ length: rad / 5, speed: randomInt(-5, 5) },
			{ length: rad / 5, speed: randomInt(-5, 5) },
			{ length: rad / 5, speed: randomInt(-5, 5) },
		], { centre, radius, paintCol: randomCol(0.5, 0.9), lineCol: '#FFFFFF' });
	} while (chain.getLimit() <= 0);
	return chain;
}

window.addEventListener('DOMContentLoaded', async () => {
	const targets = [...document.getElementsByTagName('spinblot')];
	const count = targets.length;

	const scale = (count > 4) ? 2 : (count > 1) ? 5 : 10;
	const rad = 90 * scale;
	const pad = 10 * scale;

	const size = {
		width: rad * 2 + pad * 2,
		height: rad + pad * 2,
	};
	const centre = {
		x: rad + pad,
		y: rad + pad,
	};

	const playerOptions = {
		stepsPerFrame: Math.ceil(150 / (count + 3)),
		totalSteps: 10000,
	};
	const displayDelay = 2000;
	const fadeOutDelay = 2000;

	const period = (playerOptions.totalSteps / playerOptions.stepsPerFrame) * 1000 / 50 + displayDelay + fadeOutDelay;
	const beginMaxDelay = (count > 1) ? period : 0;

	const blots = targets.map((target) => {
		const blot = new SpinBlotPlayer(new SpinBlotCanvas(size), playerOptions);
		blot.canvas.container.className = target.className;
		target.parentNode.replaceChild(blot.canvas.container, target);
		return blot;
	});

	blots.forEach(async (blot) => {
		await sleep(Math.random() * beginMaxDelay);
		while (true) {
			blot.canvas.container.classList.remove('fade');
			await blot.play([randomChain(rad, 1 * scale, centre)]);
			await sleep(displayDelay);
			blot.canvas.container.classList.add('fade');
			await sleep(fadeOutDelay);
		}
	});
});
