import { Fragment } from 'react'
import PhotoCard from './PhotoCard.jsx'
import PhotoModal from './PhotoModal.jsx'

function Gallery({ zdjecia, onUsun, onPrzelacz }) {
  return (
    <section id="galeria" className="row g-4">
      {zdjecia.map(photo => {
        const photoId = photo.id;

        return (
          <Fragment key={photoId}>
            <div className="col-12 col-md-6 col-lg-4">
              <PhotoCard
                {...photo}
                onUsun={() => onUsun(photoId)}
                onPrzelacz={() => onPrzelacz(photoId)}
              />
            </div>
            <PhotoModal {...photo} />
          </Fragment>
        );
      })}
    </section>
  );
}

export default Gallery
