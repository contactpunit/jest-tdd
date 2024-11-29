import { transformToNumber } from "./util/numbers.js";
import { validateNumber, validateStringNotEmpty } from "./util/validation.js";

export function add(numbers) {
  let sum = 0;

  for (const number of numbers) {
    sum += +number;
  }
  return sum;
}

export function calculateResult(numberInputs) {
  let result = ''
  try {
    const numbers = cleanNumbers(numberInputs);
    result = add(numbers).toString();
  } catch (error) {
    result = error.message;
  }
  return result
}

function cleanNumbers(numberInputs) {
  const numbers = []
  for (const numberInput of numberInputs) {
    validateStringNotEmpty(numberInput);
    const number = transformToNumber(numberInput);
    validateNumber(number);
    numbers.push(number);
  }
  return numbers
}