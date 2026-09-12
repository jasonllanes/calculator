import Calculator from './components/Calculator.jsx'
import ThemeToggle from './components/ThemeToggle.jsx'
import { useTheme } from './hooks/useTheme.js'

function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="flex min-h-svh items-center justify-center bg-gray-100 transition-colors dark:bg-[#0f1115]">
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
      <Calculator />
    </div>
  )
}

export default App
