function makeCanvas(width, height) {
	const canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	return canvas;
}

function combineBounds(a, b) {
	return {
		minX: Math.min(a.minX, b.minX),
		minY: Math.min(a.minY, b.minY),
		maxX: Math.max(a.maxX, b.maxX),
		maxY: Math.max(a.maxY, b.maxY),
	};
}

class SpinBlotCanvas {
	constructor({ width, height }) {
		this.width = width;
		this.height = height;
		this.container = document.createElement('spinblot');
		this.back = makeCanvas(width, height).getContext('2d');
		this.back.canvas.classList.add('back');
		this.container.appendChild(this.back.canvas);
		this.vis = makeCanvas(width, height).getContext('2d');
		this.vis.canvas.classList.add('vis');
		this.container.appendChild(this.vis.canvas);
	}

	clear() {
		this.back.clearRect(0, 0, this.width, this.height);
		this.vis.clearRect(0, 0, this.width, this.height);
	}

	draw(chains, t) {
		// This visualisation is based on an old glitch in the rendering of a MultiMedia Fusion drawing plugin;
		// it would fail to clear a rendered line below the topmost point + diameter of the line
		// we simulate the same bug using a clipping region:

		const bounds = chains.map((chain) => chain.getBounds(t)).reduce(combineBounds);
		this.back.save();
		this.back.beginPath();
		this.back.rect(0, 0, this.width, bounds.minY + chains[0].radius);
		this.back.clip('nonzero');

		chains.forEach((chain) => chain.draw(this.back, t, chain.paintCol));
		this.back.restore();
	}

	renderVis(chains, t) {
		this.vis.clearRect(0, 0, this.width, this.height);
		chains.forEach((chain) => chain.draw(this.vis, t, chain.lineCol));
	}
}
