const VARIANT_CLASSES = {
  digit:
    'bg-gray-200 hover:bg-gray-300 text-black dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white',
  action:
    'bg-gray-300 hover:bg-gray-400 text-black dark:bg-gray-500 dark:hover:bg-gray-400 dark:text-black',
  operator: 'bg-orange-500 hover:bg-orange-400 text-white',
  equals: 'bg-orange-500 hover:bg-orange-400 text-white',
}

function Button({ label, onClick, variant = 'digit', wide = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-16 rounded-full text-xl font-medium transition-colors active:opacity-80 ${
        VARIANT_CLASSES[variant]
      } ${wide ? 'col-span-2' : ''}`}
    >
      {label}
    </button>
  )
}

export default Button
