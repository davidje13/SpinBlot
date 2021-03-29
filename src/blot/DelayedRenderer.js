class DelayedRenderer {
	constructor({ stage1, stage2, stage3, stage2Delay }) {
		this.stage1 = stage1;
		this.stage2 = stage2;
		this.stage3 = stage3;
		this.stage2Delay = stage2Delay;
		this.renderTm = null;
		this.renderCrudeTm = null;
		this.dirty = new Set();

		this.renderNext = this.renderNext.bind(this);
		this.renderAllCrude = this.renderAllCrude.bind(this);
	}

	markForRender(canvas, chains) {
		canvas.clear();
		canvas.curChains = chains;
		canvas.stage = 0;
		if (!chains.some((chain) => (chain.getLimit() > 0))) {
			return;
		}
		if (this.stage1 > 0) {
			canvas.fastDraw(canvas.curChains, this.stage1);
		}
		this.dirty.add(canvas);
		if (this.renderTm === null) {
			this.renderTm = requestAnimationFrame(this.renderNext);
		}
		if (this.stage2Delay >= 0 && this.stage2 > 0) {
			clearTimeout(this.renderCrudeTm);
			this.renderCrudeTm = setTimeout(this.renderAllCrude, this.stage2Delay);
		}
	}

	renderNext() {
		const canvas = [...this.dirty][0];
		this.dirty.delete(canvas);
		if (canvas.curChains.some((chain) => (chain.getLimit() > 0))) {
			canvas.stage = 2;
			canvas.clear();
			canvas.fastDraw(canvas.curChains, this.stage3);
		}

		if (this.dirty.size > 0) {
			this.renderTm = requestAnimationFrame(this.renderNext);
		} else {
			this.renderTm = null;
		}
	}

	renderAllCrude() {
		this.dirty.forEach((canvas) => {
			if (canvas.stage === 0 && canvas.curChains.some((chain) => (chain.getLimit() > 0))) {
				canvas.stage = 1;
				canvas.fastDraw(canvas.curChains, this.stage2);
			}
		});
	}
}
