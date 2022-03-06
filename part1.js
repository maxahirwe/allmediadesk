/**
 * removes space in a string
 * @param {String} s
 * @returns {String} trimmed string
 */
function spaceTrim(s) {
	return s ? s.replace(/ /g, '') : null;
}

/**
 * @param {String} term computes a mathematical evalution written as a string for ex: (5+8)*3/8+3
 * @returns {Numbers}
 */
const termCalculator = (term, debug = false) => {
	const sanitisedTerm = spaceTrim(term);
	const operatorsMapping = {
		'+': (a, b) => {
			return a + b;
		},
		'-': (a, b) => {
			return a - b;
		},
		'*': (a, b) => {
			return a * b;
		},
		'/': (a, b) => {
			return a / b;
		},
	};
	const operators = Object.keys(operatorsMapping);
	const reducer = (res, a, index) => {
		const firstChar = a[0];
		const operator = operators.find((o) => o === firstChar) || '+';
		const num = Number.parseFloat(a) || Number.parseFloat(a.slice(1));
		const number = Math.abs(num);
		const fx = operatorsMapping[operator];
		const result = fx(res, number);
		if (debug) {
			console.log('operation:', res, operator, number, '=', result);
		}
		return Number.isNaN(result) ? res : result;
	};
	const parantheseMatchRegX = /\(([^()]+)\)/g;
	const arithmeticRegX = /(?=[-+*\/])/;
	const allOperationsWithBrackets = sanitisedTerm.match(parantheseMatchRegX);
	if (debug) {
		console.log('allOperationsWithBrackets', allOperationsWithBrackets);
	}
	// first do all operations between brackets
	const paraOperations = allOperationsWithBrackets?.map((m, index) => {
		const withoutParantheses = m.replace('(', '').replace(')', '');
		const separated = withoutParantheses.split(arithmeticRegX);
		const result = separated.reduce(reducer, 0);
		return {
			index,
			syntax: m,
			withoutParantheses,
			separated,
			result,
		};
	});
	if (debug) {
		console.log(paraOperations);
	}
	let newterm = sanitisedTerm;
	//apply results within brackets in the entire evaluation
	paraOperations?.forEach(({ syntax, result }) => {
		newterm = newterm.replace(syntax, result);
	});

	//compute final operations after brackets normalisation
	const evaluation = newterm.split(arithmeticRegX).reduce(reducer, 0);
	if (debug) {
		console.log('normalised equation:', newterm);
		console.log('results:', evaluation);
	}
	return evaluation;
};

//PART 1  TEST
console.log('PART 1 TESTS');
console.log(termCalculator('(5+8)*3/8+3'));
console.log(termCalculator('(5+8)*3/8+3-(15/3)'));
console.log(termCalculator('(5-2*3.4)+(6+1)'));

console.log('-PART 1 TESTS-');

module.exports = { termCalculator, spaceTrim };
