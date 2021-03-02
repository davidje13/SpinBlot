class SpinBlotPlayer {
	constructor(canvas, { stepsPerFrame, totalSteps }) {
		this.canvas = canvas;
		this.stepsPerFrame = stepsPerFrame;
		this.totalSteps = totalSteps;
		this.chains = [];
		this.callback = null;
		this.n = 0;

		this._step = this._step.bind(this);
	}

	_step() {
		for (let i = 0; i < this.stepsPerFrame && this.n < this.totalSteps; ++i, ++this.n) {
			this.canvas.draw(this.chains, this.n / this.totalSteps);
		}
		this.canvas.renderVis(this.chains, this.n / this.totalSteps);
		if (this.n >= this.totalSteps) {
			this.canvas.container.classList.add('done');
			if (this.callback) {
				this.callback();
			}
			return;
		}
		requestAnimationFrame(this._step);
	}

	play(chains) {
		return new Promise((resolve) => {
			this.n = 0;
			this.chains = chains;
			this.callback = resolve;
			this.canvas.clear();
			this.canvas.container.classList.remove('done');
			this._step();
		});
	}
}
