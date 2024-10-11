import React, { useState, useEffect } from 'react';
import '@/app/styles/modal.scss';
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
const Modal = ({
  results,
  SetIsOpen,
  isSelected,
  SetIsSelected,
  setIsNextLoading,
  isNextLoading
}: {
  results: UnsplashImage[];
  isSelected: number;
  SetIsSelected: (sel: number) => void;
  SetIsOpen: (result: boolean) => void;
  isNextLoading: boolean;
  setIsNextLoading: (res: boolean) => void;
}) => {
  const [nextHeight, setNextHeight] = useState(0);
  const [nextWidth, setNextWidth] = useState(0);

  const onNextPrev = () => {
    if (isNextLoading) {
      const timer = setTimeout(() => {
        setIsNextLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  };

  useEffect(() => {
    if (isNextLoading) {
      onNextPrev();
    }
  }, [isNextLoading]);

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const { height, width } = event.currentTarget;
    setNextHeight(height);
    setNextWidth(width);
    setIsNextLoading(false);
  };

  return (
    <div className='modal-container'>
      <div className='close-btn-container'>
        <button className='close-btn' onClick={() => SetIsOpen(false)}>
          <div>&times;</div>
        </button>
      </div>
      <div className='modal-content'>
        {results.map((items: UnsplashImage, index: number) => {
          if (isSelected === index) {
            const imgStyle: React.CSSProperties = {
              width: 'auto',
              height: 'auto',
              maxWidth: '100%',
              maxHeight: '90vh',
              objectFit: 'contain',
            };

            return (
              <div key={index} className='img-container'>
                <div className='button-container'>
                  <div className='button-wrapper'>
                    {isSelected == 0 ?
                    <div></div>
                    :<button
                      onClick={() => {
                        if (isSelected > 0) {
                          SetIsSelected(isSelected - 1);
                          setIsNextLoading(true);
                        }
                      }}
                    >
                      &lt;
                    </button>}
                  </div>
                  <div className='image-wrapper'>
                    {isNextLoading ? (
                      
                      <div
                        className='light'
                        style={{
                          width: `${nextWidth}px`,
                          height: `${nextHeight}px`,
                          backgroundColor: '#f0f0f0', 
                          borderRadius:'20px'
                        }}
                      ></div>
                    ) : (
                      <img
                        key={items.id}
                        src={items.urls.raw}
                        alt={items?.alt_description}
                        style={imgStyle}
                        onLoad={handleImageLoad} 
                      />
                    )}
                  </div>
                  <div className='button-wrapper'>
                  { isSelected+1 == results.length ? 
  <div></div> 
 :
                  <button
                      onClick={() => {
                        if (isSelected < results.length - 1) {
                          SetIsSelected(isSelected + 1);
                          setIsNextLoading(true);
                        }
                      }}
                    >
                      &gt;
                    </button>
     }                
                  </div>
                </div>
                <div className='page'>
                    <p>{isSelected + 1} of {results.length}</p>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Modal;
