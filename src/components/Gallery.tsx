import React, { useEffect } from 'react';
import '@/app/styles/gallery.scss';
interface UnsplashImage {
  id: string;
  urls: {
    raw: string;
    small: string;
  };
  alt_description: string;
  width: number;
  height: number;
}
const Gallery = ({
  results,
  SetIsOpen,
  SetIsSelected,
  isLoading,

}: {
  results: UnsplashImage[];
  SetIsOpen: (res: boolean) => void;
  SetIsSelected: (res: number) => void;
  isLoading: boolean;

}) => {
  const calculateRowSpan = (image: HTMLImageElement, rowHeight: number) => {
    const imageHeight = image.getBoundingClientRect().height;
    const span = Math.ceil(imageHeight / rowHeight);
    return span;
  };

  const adjustImageSpan = () => {
    const allImages = document.querySelectorAll('.gallery-container img');
    const rowHeight = 10; // This must match `gap` in CSS
    allImages.forEach((img) => {
      const imageElement = img as HTMLImageElement;
      const span = calculateRowSpan(imageElement, rowHeight);
      imageElement.style.gridRowEnd = `span ${span}`;
    });
  };

  useEffect(() => {

    adjustImageSpan(); 


    window.addEventListener('resize', adjustImageSpan);
    return () => {
      window.removeEventListener('resize', adjustImageSpan);
    };
  }, [results]); 




  const handleImageLoad = () => {
    adjustImageSpan(); 
  };


  return (
    <div className='gallery-container'>
      {!isLoading ? (
       
        <>
          {results.map((item: UnsplashImage, index: number) => (
            <img
              key={item.id}
              src={item.urls.small}
              alt={item.alt_description}
              onLoad={handleImageLoad} 
              onClick={() => {
                SetIsOpen(true);
                SetIsSelected(index);
                // setIsNextLoading(true);
                // onNextPrev();
              }}
            />
          ))}
        </>
      ) : (
        <>
          {results.length !== 0 ? <h1>Loading...</h1> : <h1>No Image Found</h1>}
        </>
      )}
    </div>
  );
};

export default Gallery;
