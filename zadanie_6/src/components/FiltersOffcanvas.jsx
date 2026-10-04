const filter_categories = [
  { id: 'gory', name: 'Góry' },
  { id: 'morze', name: 'Morze' },
  { id: 'miasto', name: 'Miasto' },
];

function FiltersOffcanvas({ aktywna, onWybierz }) {
  const handleToggleCategory = (targetCategory) => {
    const nextCategory = aktywna === targetCategory ? 'wszystkie' : targetCategory;
    onWybierz(nextCategory);
  };

  return (
    <aside
      className="offcanvas offcanvas-start"
      tabIndex="-1"
      id="panelFiltrow"
      aria-labelledby="panelFiltrowLabel"
    >
      <div className="offcanvas-header">
        <h2 className="offcanvas-title h5" id="panelFiltrowLabel">
          Filtry
        </h2>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Zamknij"
        ></button>
      </div>

      <div className="offcanvas-body">
        <p className="text-body-secondary">Zaznacz kategorię, którą chcesz zobaczyć:</p>

        <div className="d-flex flex-column gap-2">
          {filter_categories.map(({ id, name }) => {
            const isChecked = aktywna === id || aktywna === 'wszystkie';

            return (
              <div className="form-check" key={id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`filter-check-${id}`}
                  checked={isChecked}
                  onChange={() => handleToggleCategory(id)}
                />
                <label className="form-check-label" htmlFor={`filter-check-${id}`}>
                  {name}
                </label>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          className="btn btn-primary w-100 mt-4"
          data-bs-dismiss="offcanvas"
        >
          Zamknij
        </button>
      </div>
    </aside>
  );
}

export default FiltersOffcanvas;