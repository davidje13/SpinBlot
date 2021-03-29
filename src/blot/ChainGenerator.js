class ChainGenerator {
	constructor({
		radius,
		thickness,
		centre,
		segments,
		minSpeed,
		maxSpeed,
		lineCol = () => '#FFFFFF',
		paintCol = () => '#FFFFFF',
	}) {
		this.radius = radius;
		this.thickness = thickness;
		this.centre = centre;
		this.segments = segments;
		this.minSpeed = minSpeed;
		this.maxSpeed = maxSpeed;
		this.lineCol = lineCol;
		this.paintCol = paintCol;
	}

	random({ paintCol, lineCol } = {}) {
		let chain;
		do {
			const parts = [];
			for (let i = 0; i < this.segments; ++i) {
				parts.push({
					length: this.radius / this.segments,
					speed: randomInt(this.minSpeed, this.maxSpeed),
				});
			}
			chain = new Chain(parts, {
				centre: this.centre,
				radius: this.thickness / 2,
				paintCol: paintCol || this.paintCol(),
				lineCol: lineCol || this.lineCol(),
			});
		} while (chain.getLimit() <= 0);
		return chain;
	}

	procedural(index, { paintCol, lineCol } = {}) {
		const parts = [];
		const range = this.maxSpeed + 1 - this.minSpeed;
		let zero = 0;
		for (let i = 0; i < this.segments; ++i) { // begin at 0,0,...
			zero = zero * range + this.minSpeed;
		}
		let rem = index - zero;
		for (let i = 0; i < this.segments; ++i) {
			parts.unshift({
				length: this.radius / this.segments,
				speed: (rem % range) + this.minSpeed,
			});
			rem = Math.floor(rem / range);
		}
		return new Chain(parts, {
			centre: this.centre,
			radius: this.thickness / 2,
      paintCol: paintCol || this.paintCol(),
      lineCol: lineCol || this.lineCol(),
		});
	}

	proceduralCount() {
		const range = this.maxSpeed + 1 - this.minSpeed;
		let num = 0;
		let zero = 0;
		for (let i = 0; i < this.segments; ++i) {
			num *= range;
			zero = zero * range + this.minSpeed;
		}
		return num - zero;
	}
}
