function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="fixed right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-lg shadow transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  )
}

export default ThemeToggle
