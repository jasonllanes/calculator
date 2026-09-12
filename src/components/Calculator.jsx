import { useEffect, useReducer } from 'react'
import {
  calculatorReducer,
  initialState,
} from '../calculator/calculatorEngine.js'
import Display from './Display.jsx'
import Keypad from './Keypad.jsx'

const KEY_TO_OPERATOR = {
  '+': '+',
  '-': '-',
  '*': '×',
  '/': '÷',
}

function Calculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState)

  useEffect(() => {
    function handleKeyDown(event) {
      const { key } = event

      if (/^[0-9]$/.test(key)) {
        dispatch({ type: 'DIGIT', digit: key })
      } else if (key === '.') {
        dispatch({ type: 'DECIMAL' })
      } else if (key in KEY_TO_OPERATOR) {
        dispatch({ type: 'OPERATOR', operator: KEY_TO_OPERATOR[key] })
      } else if (key === 'Enter' || key === '=') {
        event.preventDefault()
        dispatch({ type: 'EQUALS' })
      } else if (key === 'Backspace') {
        dispatch({ type: 'BACKSPACE' })
      } else if (key === 'Escape') {
        dispatch({ type: 'CLEAR' })
      } else if (key === '%') {
        dispatch({ type: 'PERCENT' })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="w-80 overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-gray-900">
      <Display
        value={state.displayValue}
        operator={state.operator}
        previousValue={state.previousValue}
      />
      <Keypad dispatch={dispatch} />
    </div>
  )
}

export default Calculator
