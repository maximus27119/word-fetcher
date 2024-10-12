import fetch from 'node-fetch';

const imagesApiUrlBase = process.env.PIXABAY_API_URL;

const getWordImage = async (word) => {
  const options = {
    key: process.env.PIXABAY_API_KEY,
    q: word,
    orientation: 'horizontal'
  };

  const url = `${imagesApiUrlBase}?${new URLSearchParams(options).toString()}`;

  const response = await fetch(url);
  const body = await response.json();

  if (body.hits && body.hits.length > 0) {
    const imageData = body.hits[0];
    return {
      webformatURL: imageData.webformatURL,
      largeImageURL: imageData.largeImageURL
    };
  } else {
    return null;
  }
};

export { getWordImage };