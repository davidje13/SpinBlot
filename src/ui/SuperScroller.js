function clear(o) {
	while (o.lastChild) {
		o.removeChild(o.lastChild);
	}
}

function getAndDelete(map, key) {
	const v = map.get(key);
	map.delete(key);
	return v;
}

function popMap(map) {
	return getAndDelete(map, map.keys().next().value);
}

class SuperScroller {
	constructor(target, { rowHeight, rowHeightUnit, rowGenerator, rowRenderer, totalRows }) {
		this.target = target;
		this.spacingTop = document.createElement('div');
		this.spacingBottom = document.createElement('div');
		this.curFirst = 0;
		this.curCount = 0;
		this.rowHeight = rowHeight;
		this.rowHeightUnit = rowHeightUnit;
		this.rowGenerator = rowGenerator;
		this.rowRenderer = rowRenderer;
		this.totalRows = totalRows;
		this.allRows = [];
	}

	addRow() {
		const row = { curNum: null, data: this.rowGenerator(), rendered: null };
		this.allRows.push(row);
		return row;
	}

	render(first, count) {
		count = Math.max(0, count);
		first = Math.max(0, Math.min(this.totalRows - count, first));
		if (this.curFirst === first && this.curCount === count) {
			return;
		}
		this.curFirst = first;
		this.curCount = count;

		clear(this.target);
		this.target.appendChild(this.spacingTop);
		const availableRows = new Map(this.allRows.map((row) => [row.curNum, row]));
		const rowNumbers = [];
		for (let y = 0; y < count; ++ y) {
			rowNumbers.push(y + first);
		}
		rowNumbers
			.map((num) => ({ num, row: getAndDelete(availableRows, num) }))
			.map(({ num, row }) => ({ num, row: (row || popMap(availableRows) || this.addRow()) }))
			.forEach(({ num, row }) => {
				if (row.curNum !== num) {
					row.curNum = num;
					row.rendered = this.rowRenderer(row.data, num);
          row.rendered.style.height = this.rowHeight + this.rowHeightUnit;
				}
				this.target.appendChild(row.rendered);
			});
		this.target.appendChild(this.spacingBottom);
		this.spacingTop.style.height = (first * this.rowHeight) + this.rowHeightUnit;
		this.spacingBottom.style.height = ((this.totalRows - count - first) * this.rowHeight) + this.rowHeightUnit;
	}
}
