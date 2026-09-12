const VARIANT_CLASSES = {
  digit: 'bg-gray-700 hover:bg-gray-600 text-white',
  action: 'bg-gray-500 hover:bg-gray-400 text-black',
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
