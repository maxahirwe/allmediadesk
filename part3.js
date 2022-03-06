var babar = require('babar');
const { termCalculator, spaceTrim } = require('./part1');

/**
 * Accept an algebric equation and plots the grapg
 * @param {String} termX
 * @param {Number} x

 */
const evaluateFunction = (termX, x, debug = false) => {
	const eq = spaceTrim(termX);
	const term = eq.split('=');
	if (term.length != 2) {
		throw new Error(`Syntax must be equal to y = <TERM>`);
	}
	const evalution = term[1].replaceAll('x', `*${x}`);
	if (debug) {
		console.log(evalution);
	}
	const result = termCalculator(evalution);
	return result;
};

const drawGraph = (termX, maximumXvalue = 100, debug = false) => {
	const values = [...new Array(maximumXvalue + 1)].map((v, index) => {
		return index;
	});
	const graphPoints = values.map((x) => {
		const y = evaluateFunction(termX, x);
		return { x, y, point: [x, y] };
	});
	if (debug) {
		console.log(graphPoints, graphPoints);
	}
	const points = graphPoints.map((v) => v.point);
	const graph = babar(points, {
		color: 'magenta',
		width: 80,
		height: 40,
	});
	return graph;
};
console.log('PART 3 TESTS');
console.log(drawGraph('y=4x+5*(2x/3)'));
console.log(drawGraph('y=3+x*1.5'));
