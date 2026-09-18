const imageCache = new Map();
const loadedImages = new Set();

export const preloadImage = (src) => {
  if (!src) return Promise.resolve(false);

  if (loadedImages.has(src)) {
    return Promise.resolve(true);
  }

  if (imageCache.has(src)) {
    return imageCache.get(src);
  }

  const promise = new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => {
      loadedImages.add(src);
      imageCache.delete(src);
      resolve(true);
    };
    img.onerror = () => {
      imageCache.delete(src);
      reject(new Error(`Failed to load image: ${src}`));
    };
    img.src = src;
  });

  imageCache.set(src, promise);
  return promise;
};

export const isImageCached = (src) => !!src && loadedImages.has(src);
