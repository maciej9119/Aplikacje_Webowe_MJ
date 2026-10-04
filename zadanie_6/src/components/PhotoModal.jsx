function PhotoModal({ id, title, description, imageLarge, alt }) {
  const modalId = `zdjecie${id}`;
  const labelId = `${modalId}Label`;

  return (
    <div
      className="modal fade"
      id={modalId}
      tabIndex="-1"
      aria-labelledby={labelId}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title h5" id={labelId}>
              {title}
            </h2>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Zamknij"
            />
          </div>

          <div className="modal-body p-4">
            <figure className="m-0">
              <img
                src={imageLarge}
                className="img-fluid rounded w-100"
                alt={alt}
              />
              {description && (
                <figcaption className="mt-3 text-body-secondary">
                  {description}
                </figcaption>
              )}
            </figure>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Zamknij
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhotoModal
