const writtenNumber = require('written-number');

export function numberToText(n: number): string {
  let text = writtenNumber(Math.floor(n), { noAnd: true });
  const cents = (100 * (n % 1)).toFixed();
  if (+cents > 0) text += ' and ' + cents + '/100';
  return ('the sum of ' + text + ' pesos only.').toUpperCase();
}
