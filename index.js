//import chalk from "chalk";
import path from "path";
import fs from "fs";

const __dirname = process.env.PWD;

function errorCheck(error) {
  throw new Error(error.code, error.message);
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

async function getFile(filePath) {
  const encoding = "utf-8";
  const data = await fs.promises.readFile(filePath, encoding);
  return extractLinks(data);
}

export default async function getFilesOnPath(filePath) {
  const fullPath = path.join(__dirname, filePath);
  const encoding = "utf-8";
  try {
    const files = await fs.promises.readdir(fullPath, { encoding });
    console.log(files, `${filePath}${files}`);
    const results = await Promise.all(
      files.map(async (fileName) => {
        return await getFile(`${filePath}${fileName}`);
      })
    );

    return results;
  } catch (error) {
    errorCheck(error);
  }
}
