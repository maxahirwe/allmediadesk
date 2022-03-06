/**
 * @param {Number|String} number peter number program
 * @returns {Numbers}
 */
const peterMedidation = (number) => {
	/**
	 * checks whether all digits in a number are in descending order
	 * @param {String} number
	 */
	const isAscending = (number) => {
		const numbers = String(number)
			.split('')
			.map((n) => parseInt(n));
		let isAscending = true;
		for (let i = 0; i < numbers.length; i++) {
			const previousDigit = numbers[i - 1];
			const currentDigit = numbers[i];
			if (previousDigit > currentDigit) {
				isAscending = false;
				break;
			}
		}
		return isAscending;
	};

	const findTheLastCheckedNumber = (lastNumber) => {
		for (let stopPoint = lastNumber; stopPoint >= 0; stopPoint--) {
			if (isAscending(stopPoint)) {
				return stopPoint;
			}
		}
	};
	const lastCheckedNumber = findTheLastCheckedNumber(number);
	console.log('Peter last checked:', lastCheckedNumber);
	return lastCheckedNumber;
};

//PART 2 TEST
console.log('PART 2 TESTS');
console.log('results:', peterMedidation(23245));
console.log('results:', peterMedidation(11235888));
console.log('results:', peterMedidation(111110));
console.log('results:', peterMedidation(33245));
