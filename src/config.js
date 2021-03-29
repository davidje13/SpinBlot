function getConfig({ scale, lineCol, paintCol }) {
	const rad = 90 * scale;
	const pad = 10 * scale;

	return {
		size: {
			width: rad * 2 + pad * 2,
			height: rad + pad * 2,
		},
		generator: new ChainGenerator({
			radius: rad,
			thickness: 2 * scale,
			centre: { x: rad + pad, y: rad + pad },
			segments: 5,
			minSpeed: -5,
			maxSpeed: 5,
			lineCol,
			paintCol,
		}),
	};
}
