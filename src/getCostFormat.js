export default function getCostFormat(stringNumber, displayCurrency) {
  if (!stringNumber) return stringNumber;

  return parseInt(stringNumber, 10)
    .toLocaleString('en-US', {
      style: 'currency',
      currency: displayCurrency ? displayCurrency : 'INR',
    })
    .split('.')[0];
}
