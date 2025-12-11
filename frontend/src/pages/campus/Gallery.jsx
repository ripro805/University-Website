import { useState } from 'react';

export default function Gallery() {
  const galleryImages = [
    '/images/Gallery/513752260_1295505439241214_715342531234786834_n.jpg',
    '/images/Gallery/514275219_1295505405907884_6820469947152407341_n.jpg',
    '/images/Gallery/514276684_1295505479241210_3608923285343765515_n.jpg',
    '/images/Gallery/514575618_1295505385907886_7587505232769014090_n.jpg',
    '/images/Gallery/535606979_1340618044729953_4142111373087115503_n.jpg',
    '/images/Gallery/544865243_1356603096464781_7842226818870015500_n.jpg',
    '/images/Gallery/545415107_1357672759691148_7169113702175270978_n.jpg',
    '/images/Gallery/546501150_1360506236074467_3051594674230548036_n.jpg',
    '/images/Gallery/546637623_1360506382741119_7532065078963270516_n.jpg',
    '/images/Gallery/547283264_1360506519407772_5975802793402143060_n.jpg',
    '/images/Gallery/547359609_1360506116074479_2826239310028444221_n.jpg',
    '/images/Gallery/547423903_1360506166074474_8232953447283543315_n.jpg',
    '/images/Gallery/547430197_1360506072741150_6077305111534718166_n.jpg',
    '/images/Gallery/594036719_1435297978595292_7686211569139560455_n.jpg',
    '/images/Gallery/595010893_1438718648253225_5074784991606721970_n.jpg',
    '/images/Gallery/596886661_1438717738253316_1844427605782567938_n.jpg',
  ];

  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Header Section */}
      <div style={{ background: 'linear-gradient(to right, #1e40af, #1e3a8a)', color: 'white', padding: '4rem 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1rem' }}>
            Campus Gallery
          </h1>
          <p style={{ textAlign: 'center', color: '#bfdbfe', fontSize: '1.125rem' }}>
            Glimpses of life at Gopalganj Science & Technology University
          </p>
        </div>
      </div>

      {/* Gallery Grid */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {galleryImages.map((image, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(image)}
              style={{
                position: 'relative',
                width: '100%',
                paddingBottom: '75%',
                overflow: 'hidden',
                borderRadius: '0.5rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                backgroundColor: '#e5e7eb'
              }}
            >
              <img
                src={image}
                alt={`Campus ${index + 1}`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
        >
          <button
            onClick={() => setSelectedImage(null)}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              color: 'white',
              fontSize: '3rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              zIndex: 10000
            }}
          >
            ×
          </button>
          <img
            src={selectedImage}
            alt="Selected"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              borderRadius: '0.5rem'
            }}
          />
          <div style={{ position: 'absolute', bottom: '1rem', left: 0, right: 0, textAlign: 'center', color: 'white', fontSize: '0.875rem' }}>
            Click anywhere outside the image to close
          </div>
        </div>
      )}
    </div>
  );
}
