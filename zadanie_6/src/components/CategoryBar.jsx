const categories = [
  { value: 'wszystkie', label: 'Wszystkie' },
  { value: 'gory', label: 'Góry' },
  { value: 'morze', label: 'Morze' },
  { value: 'miasto', label: 'Miasto' },
]

function CategoryBar({ aktywna, onWybierz }) {
  return (
    <nav id="kategorie" className="d-flex flex-wrap gap-2 mb-4" aria-label="Kategorie zdjęć">
      {categories.map((cat) => {
        const isSelected = aktywna === cat.value;
        const buttonClasses = ['btn', 'btn-outline-primary', isSelected && 'active']
          .filter(Boolean)
          .join(' ');

        return (
          <button
            key={cat.value}
            type="button"
            className={buttonClasses}
            aria-pressed={isSelected}
            onClick={() => onWybierz(cat.value)}
          >
            {cat.label}
          </button>
        );
      })}
    </nav>
  );
}

export default CategoryBar
