import chalk from "chalk";
import fs from "fs";

function errorCheck(error) {
  throw new Error(chalk.red(error.code, error.message));
}

function extractLinks(text) {
  const regex = /\[([^\]]*)\]\((https?[^\)]*)\)/gm;
  const results = [];
  let temp;

  while ((temp = regex.exec(text)) !== null) {
    results.push({ [temp[1]]: temp[2] });
  }
  if (results.length === 0) {
    return "No links were found.";
  } else {
    return results;
  }
}

export default async function getFile(filePath) {
  const encoding = "utf-8";
  try {
    const data = await fs.promises.readFile(filePath, encoding);
    return extractLinks(data);
  } catch (error) {
    errorCheck(error);
  }
}
