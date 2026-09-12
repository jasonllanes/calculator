import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Calculator from './Calculator.jsx'

describe('Calculator', () => {
  it('computes 7 + 3 = 10 via button clicks', async () => {
    const user = userEvent.setup()
    render(<Calculator />)

    await user.click(screen.getByText('7'))
    await user.click(screen.getByText('+'))
    await user.click(screen.getByText('3'))
    await user.click(screen.getByText('='))

    expect(screen.getByTestId('display-value')).toHaveTextContent('10')
  })

  it('clears the display with AC', async () => {
    const user = userEvent.setup()
    render(<Calculator />)

    await user.click(screen.getByText('9'))
    await user.click(screen.getByText('AC'))

    expect(screen.getByTestId('display-value')).toHaveTextContent('0')
  })

  it('responds to keyboard input', async () => {
    const user = userEvent.setup()
    render(<Calculator />)

    await user.keyboard('12+8=')

    expect(screen.getByTestId('display-value')).toHaveTextContent('20')
  })
})
