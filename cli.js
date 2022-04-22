import getFilesOnPath from "./index.js";
import checkURLs from "./http-validation.js";
import chalk from "chalk";
const filePath = process.argv[2];

async function processText(filePath) {
  const result = await getFilesOnPath(filePath);
  const checkedLinks = checkURLs(result);
  console.log(chalk.yellow("Checked list: \n"), checkedLinks);
}

processText(filePath);
