export const initialState = {
  displayValue: '0',
  previousValue: null,
  operator: null,
  overwrite: true,
  lastOperator: null,
  lastOperand: null,
}

const MAX_DIGITS = 12

export function formatNumber(value) {
  if (value === 'Error') return value

  const num = Number(value)
  if (!Number.isFinite(num)) return 'Error'

  let str = num.toString()
  if (str.length > MAX_DIGITS) {
    str = num.toPrecision(MAX_DIGITS - 5)
    str = Number(str).toString()
    if (str.length > MAX_DIGITS) {
      str = num.toExponential(5)
    }
  }
  return str
}

export function applyOperator(a, b, operator) {
  switch (operator) {
    case '+':
      return a + b
    case '-':
      return a - b
    case '×':
      return a * b
    case '÷':
      return b === 0 ? NaN : a / b
    default:
      return b
  }
}

export function calculatorReducer(state, action) {
  switch (action.type) {
    case 'DIGIT':
      return inputDigit(state, action.digit)
    case 'DECIMAL':
      return inputDecimal(state)
    case 'OPERATOR':
      return chooseOperator(state, action.operator)
    case 'EQUALS':
      return evaluate(state)
    case 'TOGGLE_SIGN':
      return toggleSign(state)
    case 'PERCENT':
      return applyPercent(state)
    case 'CLEAR':
      return initialState
    case 'BACKSPACE':
      return backspace(state)
    default:
      return state
  }
}

function inputDigit(state, digit) {
  if (state.displayValue === 'Error') {
    return { ...initialState, displayValue: digit, overwrite: false }
  }

  if (state.overwrite) {
    return { ...state, displayValue: digit, overwrite: false }
  }

  if (state.displayValue === '0') {
    return { ...state, displayValue: digit }
  }

  if (state.displayValue.replace('-', '').length >= MAX_DIGITS) {
    return state
  }

  return { ...state, displayValue: state.displayValue + digit }
}

function inputDecimal(state) {
  if (state.displayValue === 'Error') {
    return { ...initialState, displayValue: '0.', overwrite: false }
  }

  if (state.overwrite) {
    return { ...state, displayValue: '0.', overwrite: false }
  }

  if (state.displayValue.includes('.')) {
    return state
  }

  return { ...state, displayValue: state.displayValue + '.' }
}

function chooseOperator(state, operator) {
  if (state.displayValue === 'Error') {
    return state
  }

  if (state.previousValue === null) {
    return {
      ...state,
      previousValue: Number(state.displayValue),
      operator,
      overwrite: true,
    }
  }

  if (state.overwrite) {
    return { ...state, operator }
  }

  const result = applyOperator(
    state.previousValue,
    Number(state.displayValue),
    state.operator,
  )

  return {
    ...state,
    displayValue: formatNumber(result),
    previousValue: result,
    operator,
    overwrite: true,
  }
}

function evaluate(state) {
  if (state.displayValue === 'Error') {
    return state
  }

  // Repeated "=" with no new operator: reapply the last operation/operand.
  if (state.operator === null || state.previousValue === null) {
    if (state.lastOperator === null) {
      return state
    }
    const result = applyOperator(
      Number(state.displayValue),
      state.lastOperand,
      state.lastOperator,
    )
    return {
      ...initialState,
      displayValue: formatNumber(result),
      lastOperator: state.lastOperator,
      lastOperand: state.lastOperand,
    }
  }

  const operand = Number(state.displayValue)
  const result = applyOperator(state.previousValue, operand, state.operator)

  return {
    ...initialState,
    displayValue: formatNumber(result),
    lastOperator: state.operator,
    lastOperand: operand,
  }
}

function toggleSign(state) {
  if (state.displayValue === 'Error' || state.displayValue === '0') {
    return state
  }

  const next = state.displayValue.startsWith('-')
    ? state.displayValue.slice(1)
    : '-' + state.displayValue

  return { ...state, displayValue: next }
}

function backspace(state) {
  if (state.displayValue === 'Error' || state.overwrite) {
    return state
  }

  const next = state.displayValue.slice(0, -1)
  if (next === '' || next === '-') {
    return { ...state, displayValue: '0', overwrite: true }
  }

  return { ...state, displayValue: next }
}

function applyPercent(state) {
  if (state.displayValue === 'Error') {
    return state
  }

  const result = Number(state.displayValue) / 100
  return { ...state, displayValue: formatNumber(result), overwrite: true }
}
