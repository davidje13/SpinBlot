function hex2(v) {
	return Math.max(Math.min(Math.floor(v * 256), 255), 0).toString(16).padStart(2, '0');
}

function random(min, max) {
	return min + (Math.random() * (max - min));
}

function randomInt(min, max) {
	return Math.floor(random(min, max + 1));
}

function randomCol(minLum = 0, maxLum = 1) {
	const hueI = random(0, 6);
	const sat = random(0, 1);
	const lum = random(minLum, maxLum);

	const C = (1 - Math.abs(2 * lum - 1)) * sat;
	const X = C * ((1 - Math.abs(hueI % 2) - 1));
	const m = lum - C / 2;
	const cc = hex2(C + m);
	const xx = hex2(X + m);
	if (hueI < 1) { return `#${cc}${xx}00`; }
	if (hueI < 2) { return `#${xx}${cc}00`; }
	if (hueI < 3) { return `#00${cc}${xx}`; }
	if (hueI < 4) { return `#00${xx}${cc}`; }
	if (hueI < 5) { return `#${xx}00${cc}`; }
	return `#${cc}00${xx}`;
}
