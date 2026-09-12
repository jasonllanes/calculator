import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import ThemeToggle from './ThemeToggle.jsx'

describe('ThemeToggle', () => {
  it('shows a moon and calls onToggle when in light mode', async () => {
    const user = userEvent.setup()
    const onToggle = vi.fn()
    render(<ThemeToggle theme="light" onToggle={onToggle} />)

    const button = screen.getByRole('button', { name: /switch to dark mode/i })
    expect(button).toHaveTextContent('🌙')

    await user.click(button)
    expect(onToggle).toHaveBeenCalledTimes(1)
  })

  it('shows a sun when in dark mode', () => {
    render(<ThemeToggle theme="dark" onToggle={() => {}} />)
    expect(
      screen.getByRole('button', { name: /switch to light mode/i }),
    ).toHaveTextContent('☀️')
  })
})
