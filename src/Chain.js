function gcd(a, b) {
	while (b) {
		const a2 = b;
		b = a % b;
		a = a2;
	}
	return a;
}

class Chain {
	constructor(nodes, { centre, radius, paintCol, lineCol }) {
		this.nodes = nodes;
		this.centre = centre;
		this.radius = radius;
		this.paintCol = paintCol;
		this.lineCol = lineCol;
		this.timeMult = Math.PI * 2 / this.nodes.map(({ speed }) => Math.abs(speed)).reduce(gcd);
	}

	getLimit() {
		return this.nodes.reduce(([v, l], node) => {
			const next = v + node.length * (node.speed === 0 ? -1 : 1);
			return [next, Math.max(next, l)];
		}, [0, 0])[1];
	}

	resolve(t) {
		const result = [this.centre];
		let { x, y } = this.centre;
		this.nodes.map((node) => {
			const angle = t * node.speed * this.timeMult;
			x += Math.sin(angle) * node.length;
			y += Math.cos(angle) * node.length;
			result.push({ x, y });
		});
		return result;
	}

	getBounds(t) {
		const points = this.resolve(t);
		const xs = points.map(({ x }) => x);
		const ys = points.map(({ y }) => y);
		return {
			minX: Math.min(...xs),
			minY: Math.min(...ys),
			maxX: Math.max(...xs),
			maxY: Math.max(...ys),
		};
	}

	draw(ctx, t, colour) {
		ctx.lineWidth = this.radius * 2;
		ctx.lineJoin = 'round';
		ctx.lineCap = 'round';
		ctx.strokeStyle = colour;
		ctx.beginPath();
		//ctx.moveTo(this.centre.x, this.centre.y);
		this.resolve(t).forEach(({ x, y }) => ctx.lineTo(x, y));
		ctx.stroke();
	}
}
