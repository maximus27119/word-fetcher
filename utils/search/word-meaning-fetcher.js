import fetch from "node-fetch";
import { getWordImage } from "./image-fetcher.js";

const dictionaryApiUrlBase = process.env.DICTIONARY_API_URL;

const getWordData = async (wordString) => {
  const response = await fetch(`${dictionaryApiUrlBase}/${wordString}`);
  const [result] = await response.json();
  const imageData = await getWordImage(wordString);
  const { word, phonetic, phonetics, meanings, sourceUrls } = result;
  return{ word, phonetic, phonetics, meanings, sourceUrls, imageData };
};

const getWordsData = async (wordsArray) => {
  const wordsDataPromises = [...wordsArray].map(word => getWordData(word));
  return Promise.all(wordsDataPromises);
};

export { getWordsData, getWordData };