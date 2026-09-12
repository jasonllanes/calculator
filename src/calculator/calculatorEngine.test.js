import { describe, expect, it } from 'vitest'
import { calculatorReducer, initialState } from './calculatorEngine.js'

function run(actions) {
  return actions.reduce(calculatorReducer, initialState)
}

const digit = (d) => ({ type: 'DIGIT', digit: d })
const op = (operator) => ({ type: 'OPERATOR', operator })
const equals = { type: 'EQUALS' }
const clear = { type: 'CLEAR' }
const decimal = { type: 'DECIMAL' }
const toggleSign = { type: 'TOGGLE_SIGN' }
const percent = { type: 'PERCENT' }
const backspace = { type: 'BACKSPACE' }

describe('digit entry', () => {
  it('builds up a multi-digit number', () => {
    const state = run([digit('1'), digit('2'), digit('3')])
    expect(state.displayValue).toBe('123')
  })

  it('replaces the leading zero', () => {
    const state = run([digit('5')])
    expect(state.displayValue).toBe('5')
  })

  it('ignores a second decimal point', () => {
    const state = run([digit('1'), decimal, digit('5'), decimal, digit('2')])
    expect(state.displayValue).toBe('1.52')
  })

  it('starts a fresh number after an operator', () => {
    const state = run([digit('9'), op('+'), digit('4')])
    expect(state.displayValue).toBe('4')
    expect(state.previousValue).toBe(9)
  })
})

describe('basic arithmetic', () => {
  it('adds two numbers', () => {
    const state = run([digit('2'), op('+'), digit('3'), equals])
    expect(state.displayValue).toBe('5')
  })

  it('subtracts two numbers', () => {
    const state = run([digit('9'), op('-'), digit('4'), equals])
    expect(state.displayValue).toBe('5')
  })

  it('multiplies two numbers', () => {
    const state = run([digit('6'), op('×'), digit('7'), equals])
    expect(state.displayValue).toBe('42')
  })

  it('divides two numbers', () => {
    const state = run([digit('8'), op('÷'), digit('2'), equals])
    expect(state.displayValue).toBe('4')
  })

  it('chains operations left to right', () => {
    // 5 + 3 + 2 = 10
    const state = run([digit('5'), op('+'), digit('3'), op('+'), digit('2'), equals])
    expect(state.displayValue).toBe('10')
  })

  it('swaps the pending operator without evaluating', () => {
    // 5 + then × then 2 = 10 (not 5+2 then something)
    const state = run([digit('5'), op('+'), op('×'), digit('2'), equals])
    expect(state.displayValue).toBe('10')
  })
})

describe('divide by zero', () => {
  it('shows Error', () => {
    const state = run([digit('5'), op('÷'), digit('0'), equals])
    expect(state.displayValue).toBe('Error')
  })

  it('clears back to a usable state on next digit press', () => {
    const state = run([digit('5'), op('÷'), digit('0'), equals, digit('7')])
    expect(state.displayValue).toBe('7')
  })
})

describe('repeated equals', () => {
  it('reapplies the last operation and operand', () => {
    // 5 + 3 = = = -> 8, 11, 14
    const state = run([
      digit('5'),
      op('+'),
      digit('3'),
      equals,
      equals,
      equals,
    ])
    expect(state.displayValue).toBe('14')
  })
})

describe('clear', () => {
  it('resets to initial state', () => {
    const state = run([digit('9'), op('+'), digit('9'), clear])
    expect(state).toEqual(initialState)
  })
})

describe('toggle sign', () => {
  it('negates a positive number', () => {
    const state = run([digit('5'), toggleSign])
    expect(state.displayValue).toBe('-5')
  })

  it('un-negates back to positive', () => {
    const state = run([digit('5'), toggleSign, toggleSign])
    expect(state.displayValue).toBe('5')
  })

  it('does nothing to zero', () => {
    const state = run([toggleSign])
    expect(state.displayValue).toBe('0')
  })
})

describe('percent', () => {
  it('converts to a hundredth', () => {
    const state = run([digit('5'), digit('0'), percent])
    expect(state.displayValue).toBe('0.5')
  })
})

describe('backspace', () => {
  it('removes the last digit', () => {
    const state = run([digit('1'), digit('2'), digit('3'), backspace])
    expect(state.displayValue).toBe('12')
  })

  it('falls back to zero when the last digit is removed', () => {
    const state = run([digit('7'), backspace])
    expect(state.displayValue).toBe('0')
  })

  it('does nothing right after an operator (overwrite mode)', () => {
    const state = run([digit('7'), op('+'), backspace])
    expect(state.displayValue).toBe('7')
  })
})
