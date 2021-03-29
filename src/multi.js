function sleep(millis) {
	return new Promise((resolve) => setTimeout(resolve, millis));
}

window.addEventListener('DOMContentLoaded', async () => {
	const targets = [...document.getElementsByTagName('spinblot')];
	const count = targets.length;

	const { size, generator } = getConfig({
		scale: 2,
		lineCol: () => '#FFFFFF',
		paintCol: () => randomCol(0.5, 0.9),
	});

	const playerOptions = {
		stepsPerFrame: Math.ceil(150 / (count + 3)),
		totalSteps: 10000,
	};
	const displayDelay = 2000;
	const fadeOutDelay = 2000;

	const beginMaxDelay = (playerOptions.totalSteps / playerOptions.stepsPerFrame) * 1000 / 50 + displayDelay + fadeOutDelay;

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
			await blot.play([generator.random()]);
			await sleep(displayDelay);
			blot.canvas.container.classList.add('fade');
			await sleep(fadeOutDelay);
		}
	});
});
