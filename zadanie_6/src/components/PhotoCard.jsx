const category_map = {
  gory: { label: 'Góry', variant: 'success' },
  morze: { label: 'Morze', variant: 'primary' },
  miasto: { label: 'Miasto', variant: 'dark' },
};

function PhotoCard({
  id,
  title,
  description,
  category,
  image,
  alt,
  favorite,
  onUsun,
  onPrzelacz,
}) {
  const currentCategory = category_map[category] || { label: category, variant: 'secondary' };
  const favLabel = favorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych';
  const starIconClass = favorite ? 'bi bi-star-fill text-warning' : 'bi bi-star';

  return (
    <article className="card h-100 shadow-sm">
      <img src={image} className="card-img-top" alt={alt} />
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h3 className="card-title h5 mb-0">{title}</h3>
          <button
            type="button"
            className="btn btn-link p-0 fs-4 lh-1"
            onClick={onPrzelacz}
            aria-label={favLabel}
            aria-pressed={favorite}
          >
            <i className={starIconClass} />
          </button>
        </div>

        <div>
          <span className={`badge text-bg-${currentCategory.variant}`}>
            {currentCategory.label}
          </span>
        </div>

        <p className="card-text text-body-secondary mt-2">{description}</p>

        <div className="d-flex gap-2 mt-auto pt-3">
          <button
            type="button"
            className="btn btn-outline-primary flex-fill"
            data-bs-toggle="modal"
            data-bs-target={`#zdjecie${id}`}
          >
            Powiększ
          </button>
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={onUsun}
          >
            Usuń
          </button>
        </div>
      </div>
    </article>
  );
}

export default PhotoCard
