function sleep(millis) {
	return new Promise((resolve) => setTimeout(resolve, millis));
}

window.addEventListener('DOMContentLoaded', async () => {
	const target = document.getElementsByTagName('spinblot')[0];

	const { size, generator } = getConfig({
		scale: 10,
		lineCol: () => '#FFFFFF',
		paintCol: () => randomCol(0.5, 0.9),
	});

	const playerOptions = {
		stepsPerFrame: 40,
		totalSteps: 10000,
	};
	const displayDelay = 2000;
	const fadeOutDelay = 2000;

	const blot = new SpinBlotPlayer(new SpinBlotCanvas(size), playerOptions);
	blot.canvas.container.className = target.className;
	target.parentNode.replaceChild(blot.canvas.container, target);

	(async (blot) => {
		while (true) {
			blot.canvas.container.classList.remove('fade');
			await blot.play([generator.random()]);
			await sleep(displayDelay);
			blot.canvas.container.classList.add('fade');
			await sleep(fadeOutDelay);
		}
	})(blot);
});
