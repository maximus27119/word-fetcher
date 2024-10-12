import 'dotenv/config';
import * as path from 'path';
import chalk from 'chalk';

import { getWordsData } from './utils/search/word-meaning-fetcher.js';
import { readAndTrimWordsFromNewlineFile } from './utils/file/file-reader.js';
import { writeToJsonFile, writeToJsFile } from './utils/file/file-writer.js';

const WORDS_SOURCE_DIR = process.env.WORDS_SOURCE_DIR;
const WORDS_SOURCE_FILE = process.env.WORDS_SOURCE_FILE;

const WORDS_RESULT_DIR = process.env.WORDS_RESULT_DIR;
const WORDS_RESULT_FILE = process.env.WORDS_RESULT_FILE;

if (!WORDS_SOURCE_DIR || !WORDS_SOURCE_FILE || !WORDS_RESULT_DIR || !WORDS_RESULT_FILE) {
  console.error(chalk.red.bold('Missing required environment variables.'));
  process.exit(1);
}

const main = async () => {
  try {
    const sourceFilePath = path.join(WORDS_SOURCE_DIR, WORDS_SOURCE_FILE);
    const inputWordsArray = readAndTrimWordsFromNewlineFile(sourceFilePath);

    const wordsAmount = inputWordsArray.length;
    console.log(chalk.red.bold(`${wordsAmount} words uploaded.`));

    const wordsDataArray = await getWordsData(inputWordsArray);

    const fetchedWordsAmount = wordsDataArray.length;
    console.log(chalk.green.bold(`${fetchedWordsAmount} words fetched.`));

    const resultFilePath = path.join(WORDS_RESULT_DIR, WORDS_RESULT_FILE);
    const fileType = path.extname(WORDS_RESULT_FILE).slice(1);

    if (fileType === 'json')
      writeToJsonFile(wordsDataArray, resultFilePath);
    else if (fileType === 'js')
      writeToJsFile(wordsDataArray, 'words' , resultFilePath);

    console.log(chalk.blue.bold(`Created file in ${resultFilePath}`));
    process.exit(0);

  } catch (error) {
    console.error(chalk.red.bold('An error occurred:'), error);
    process.exit(1);
  }
}

main();