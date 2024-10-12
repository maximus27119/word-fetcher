import fs from 'node:fs';

const readAndTrimWordsFromCommaFile = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf8');
  return data.split(',').map(word => word.trim()).filter(word => word.length > 0);
}

const readAndTrimWordsFromNewlineFile = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf8')
  return data.split('\n').map(word => word.trim()).filter(word => word.length > 0);
}

export { readAndTrimWordsFromCommaFile, readAndTrimWordsFromNewlineFile };