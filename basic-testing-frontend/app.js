import { extractEnteredNumberValues, extractNumbers } from './src/parser.js';
import { calculateResult } from './src/math.js';
import { generateResultText, outputResult } from './src/output.js';

const form = document.querySelector('form');
const output = document.getElementById('result');

function formSubmitHandler(event) {
  event.preventDefault();
  const numberInputs = extractEnteredNumberValues(form)

  const result = calculateResult(numberInputs)
  const resultText = generateResultText(result)
  outputResult(output, resultText)
}
form.addEventListener('submit', formSubmitHandler);
