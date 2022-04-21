import chalk from "chalk";
import fs from "fs";

function errorCheck(error) {
  throw new Error(chalk.red(error.code, "File not found!"));
}

function extractLinks(text) {
  const regex = /\[([^\]]*)\]\((https?[^\)]*)\)/gm;
  const results = [];
  let temp;

  while ((temp = regex.exec(text)) !== null) {
    results.push({ [temp[1]]: temp[2] });
  }
  return results;
}

async function getFile(filePath) {
  const encoding = "utf-8";
  try {
    const data = await fs.promises.readFile(filePath, encoding);
    console.log(chalk.yellow(data));
    console.log(extractLinks(data));
  } catch (error) {
    errorCheck(error);
  }
}

getFile("./files/text1.md");
