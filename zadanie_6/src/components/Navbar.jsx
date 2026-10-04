const nav_links = [
  { id: 'galeria', label: 'Galeria', isActive: true },
  { id: 'kategorie', label: 'Kategorie', isActive: false },
  { id: 'stopka', label: 'Kontakt', isActive: false },
];

function Navbar() {
  return (
    <header className="navbar navbar-expand-lg bg-body-tertiary border-bottom">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#">
          Galeria Podróży
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#primaryNav"
          aria-controls="primaryNav"
          aria-expanded="false"
          aria-label="Rozwiń menu"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="primaryNav">
          <ul className="navbar-nav ms-auto">
            {nav_links.map(({ id, label, isActive }) => (
              <li className="nav-item" key={id}>
                <a
                  className={`nav-link${isActive ? ' active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                  href={`#${id}`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Navbar
