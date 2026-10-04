import { useState } from 'react'
import { Modal } from 'bootstrap'

const initial_form_state = {
  title: '',
  category: '',
  image: '',
  alt: '',
  description: '',
};

function AddPhotoModal({ onDodaj }) {
  const [formData, setFormData] = useState(initial_form_state);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const payload = {
      title: formData.title,
      category: formData.category,
      image: formData.image,
      imageLarge: formData.image,
      alt: formData.alt,
      description: formData.description,
    };

    onDodaj(payload);
    setFormData(INITIAL_FORM_STATE);

    const modalElement = document.getElementById('dodajZdjecie');
    if (modalElement) {
      const modalInstance = Modal.getInstance(modalElement);
      modalInstance?.hide();
    }
  };

  return (
    <div
      className="modal fade"
      id="dodajZdjecie"
      tabIndex="-1"
      aria-labelledby="dodajZdjecieLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title h5" id="dodajZdjecieLabel">
              Dodaj zdjęcie
            </h2>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Zamknij"
            ></button>
          </div>

          <form onSubmit={handleFormSubmit}>
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="tytul" className="form-label">
                    Tytuł
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="tytul"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="kategoria" className="form-label">
                    Kategoria
                  </label>
                  <select
                    className="form-select"
                    id="kategoria"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>
                      Wybierz kategorię…
                    </option>
                    <option value="gory">Góry</option>
                    <option value="morze">Morze</option>
                    <option value="miasto">Miasto</option>
                  </select>
                </div>

                <div className="col-12">
                  <label htmlFor="obrazek" className="form-label">
                    Adres URL zdjęcia
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="obrazek"
                    name="image"
                    placeholder="https://…"
                    value={formData.image}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="alt" className="form-label">
                    Tekst alternatywny
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="alt"
                    name="alt"
                    value={formData.alt}
                    onChange={handleInputChange}
                  />
                  <div className="form-text">
                    Krótki opis zdjęcia dla osób korzystających z czytnika ekranu.
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="opis" className="form-label">
                    Opis
                  </label>
                  <textarea
                    className="form-control"
                    id="opis"
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleInputChange}
                  ></textarea>
                  <div className="form-text">
                    Jedno–dwa zdania: gdzie i kiedy powstało zdjęcie.
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="zgoda"
                    />
                    <label className="form-check-label" htmlFor="zgoda">
                      Zgadzam się na publikację zdjęcia w galerii
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Anuluj
              </button>
              <button type="submit" className="btn btn-primary">
                Zapisz
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddPhotoModal
