import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import FiltersOffcanvas from './components/FiltersOffcanvas.jsx'
import Footer from './components/Footer.jsx'
import photos from './data/photos.json'
import CategoryBar from './components/CategoryBar.jsx'
import Gallery from './components/Gallery.jsx'
import AddPhotoModal from './components/AddPhotoModal.jsx'

import './App.css'

function App() {
  const [photoList, setPhotoList] = useState(photos);
  const [selectedCategory, setSelectedCategory] = useState('wszystkie');

  const getFilteredPhotos = () => {
    if (selectedCategory === 'wszystkie') {
      return photoList;
    }
    return photoList.filter((item) => item.category === selectedCategory);
  };

  const displayedPhotos = getFilteredPhotos();

  const handleRemovePhoto = (targetId) => {
    setPhotoList((prev) => prev.filter((item) => item.id !== targetId));
  };

  const handleCreatePhoto = (newPhotoData) => {
    setPhotoList((prev) => {
      const nextId = prev.length > 0 ? Math.max(...prev.map((p) => p.id)) + 1 : 1;
      const createdItem = {
        ...newPhotoData,
        id: nextId,
        favorite: false,
      };
      return [...prev, createdItem];
    });
  };

  const handleToggleFavorite = (targetId) => {
    setPhotoList((prev) =>
      prev.map((item) => {
        if (item.id !== targetId) return item;
        return {
          ...item,
          favorite: !item.favorite,
        };
      })
    );
  };

  return (
    <>
      <Navbar />

      <header className="container py-4 py-lg-5">
        <div className="row align-items-center g-3">
          <div className="col-12 col-lg-8">
            <h1 className="mb-2">Galeria zdjęć</h1>
            <p className="lead text-body-secondary mb-0">
              Zdjęcia z nad morza, gór i miasta. Wybierz kategorię,
              żeby określić motyw oglądanych zdjęć — albo powiększ zdjęcie, które chcesz obejrzec z bliska.
            </p>
          </div>

          <div className="col-12 col-lg-4">
            <div className="d-flex flex-wrap gap-2 justify-content-lg-end">
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-toggle="offcanvas"
                data-bs-target="#panelFiltrow"
              >
                Filtry
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#dodajZdjecie"
              >
                Dodaj zdjęcie
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container">
        <CategoryBar
          aktywna={selectedCategory}
          onWybierz={setSelectedCategory}
        />

        <p className="text-body-secondary">
          Wyświetlono {displayedPhotos.length} z {photoList.length} zdjęć
        </p>

        {displayedPhotos.length === 0 ? (
          <div className="alert alert-warning">
            Nie znaleziono zdjęć w tej kategorii.
          </div>
        ) : null}

        <Gallery
          zdjecia={displayedPhotos}
          onUsun={handleRemovePhoto}
          onPrzelacz={handleToggleFavorite}
        />
      </main>

      <Footer />

      <AddPhotoModal onDodaj={handleCreatePhoto} />
      <FiltersOffcanvas
        aktywna={selectedCategory}
        onWybierz={setSelectedCategory}
      />
    </>
  );
}

export default App
