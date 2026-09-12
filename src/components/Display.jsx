function Display({ value, operator, previousValue }) {
  return (
    <div className="rounded-xl bg-gray-100 px-4 py-6 text-right dark:bg-black/30">
      <div className="h-6 truncate text-sm text-gray-500 dark:text-gray-400">
        {previousValue !== null ? `${previousValue} ${operator ?? ''}` : ' '}
      </div>
      <div
        className="truncate font-mono text-black dark:text-white"
        style={{ fontSize: value.length > 8 ? '2rem' : '3rem' }}
        data-testid="display-value"
      >
        {value}
      </div>
    </div>
  )
}

export default Display
