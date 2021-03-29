window.addEventListener('DOMContentLoaded', async () => {
	const target = document.getElementsByTagName('main')[0];
	const { size, generator } = getConfig({
		scale: 1,
		lineCol: () => '#FFFFFF',
		paintCol: () => '#0080FF',
	});

	const renderer = new DelayedRenderer({
		stage1: 10,
		stage2: 25,
		stage3: 400,
		stage2Delay: 100,
	});

	const nx = 10;
	const ny = 10;
	const scroller = new SuperScroller(target, {
		rowHeight: 100 / ny,
		rowHeightUnit: 'vh',
		rowGenerator: () => {
			const row = document.createElement('div');
			row.className = 'row';
			const canvases = [];
			for (let x = 0; x < nx; ++ x) {
				const canvas = new SpinBlotCanvas(size);
				const link = document.createElement('a');
				canvases.push({ link, canvas });
				link.appendChild(canvas.container);
				row.appendChild(link);
			}
			return { row, canvases };
		},
		rowRenderer: ({ row, canvases }, y) => {
			canvases.forEach(({ canvas, link }, x) => {
				const n = y * nx + x;
				renderer.markForRender(canvas, [generator.procedural(n)]);
				link.setAttribute('href', '#' + n);
			});
			return row;
		},
		totalRows: Math.ceil(generator.proceduralCount() / nx),
	});

	function renderAtPos() {
		const h = window.innerHeight / ny;
		scroller.render(Math.floor(window.scrollY / h) - 2, ny + 4);
	}

	document.addEventListener('scroll', renderAtPos, { passive: true });
	renderAtPos();
});
