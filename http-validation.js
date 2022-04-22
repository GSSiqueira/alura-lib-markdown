import fetch from "node-fetch";

async function checkStatus(URLs) {
  const statusArray = await Promise.all(
    URLs.map(async (URL) => {
      const response = await fetch(URL);
      return response.status;
    })
  );
  return statusArray;
}

function getURLs(data) {
  const links = data.map((link) => Object.values(link).join());
  return links;
}

export default async function checkURLs(data) {
  let results = [];
  for (let page = 0; page < data.length; page++) {
    let temp = getURLs(data[page]);
    results.push(await checkStatus(temp));
  }
  return results;
}
