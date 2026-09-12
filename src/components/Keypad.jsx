import Button from './Button.jsx'

function Keypad({ dispatch }) {
  const digit = (d) => dispatch({ type: 'DIGIT', digit: d })
  const operator = (op) => dispatch({ type: 'OPERATOR', operator: op })

  return (
    <div className="grid grid-cols-4 gap-3 p-4">
      <Button label="AC" variant="action" onClick={() => dispatch({ type: 'CLEAR' })} />
      <Button label="±" variant="action" onClick={() => dispatch({ type: 'TOGGLE_SIGN' })} />
      <Button label="%" variant="action" onClick={() => dispatch({ type: 'PERCENT' })} />
      <Button label="÷" variant="operator" onClick={() => operator('÷')} />

      <Button label="7" onClick={() => digit('7')} />
      <Button label="8" onClick={() => digit('8')} />
      <Button label="9" onClick={() => digit('9')} />
      <Button label="×" variant="operator" onClick={() => operator('×')} />

      <Button label="4" onClick={() => digit('4')} />
      <Button label="5" onClick={() => digit('5')} />
      <Button label="6" onClick={() => digit('6')} />
      <Button label="−" variant="operator" onClick={() => operator('-')} />

      <Button label="1" onClick={() => digit('1')} />
      <Button label="2" onClick={() => digit('2')} />
      <Button label="3" onClick={() => digit('3')} />
      <Button label="+" variant="operator" onClick={() => operator('+')} />

      <Button label="0" onClick={() => digit('0')} wide />
      <Button label="." onClick={() => dispatch({ type: 'DECIMAL' })} />
      <Button
        label="="
        variant="equals"
        onClick={() => dispatch({ type: 'EQUALS' })}
      />
    </div>
  )
}

export default Keypad
