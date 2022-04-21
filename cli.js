import getFilesOnPath from "./index.js";
import chalk from "chalk";
const filePath = process.argv[2];

async function processText(filePath) {
  const result = await getFilesOnPath(filePath);
  console.log(chalk.yellow("Link list: \n"), result);
}

processText(filePath);
