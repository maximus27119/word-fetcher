import fs from 'node:fs';

const saveFile = (data, filePath='./data/data.json') => {
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync(filePath, jsonData, 'utf8');
};

function writeToJsonFile(data, filePath='./data/data.json') {
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync(filePath, jsonData);
}

function writeToJsFile(data, variableName='words', filePath='./data/data.js') {
  const jsData = `const ${variableName} = ${JSON.stringify(data, null, 2)};\n\nexport default ${variableName};\n`;
  fs.writeFileSync(filePath, jsData);
}

export { writeToJsFile, writeToJsonFile };