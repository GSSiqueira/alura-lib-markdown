import fetch from "node-fetch";

async function checkStatus(URLs) {
  try {
    const statusArray = await Promise.all(
      URLs.map(async (URL) => {
        const response = await fetch(URL);
        return `${response.status} - ${response.statusText}`;
      })
    );
    return statusArray;
  } catch (error) {
    throw new Error(error);
  }
}

function getURLs(data) {
  const links = data.map((link) => Object.values(link).join());
  return links;
}

export default async function checkURLs(data) {
  let results = [];
  for (let page = 0; page < data.length; page++) {
    let temp = getURLs(data[page]);
    let statuses = await checkStatus(temp);
    let finalPage = data[page].map((link, index) => {
      return { ...link, status: statuses[index] };
    });
    /*  for (let link = 0; link < data[page].length; link++) {
      finalPage.push({ ...data[page][link], status: statuses[link] });
    } */
    results.push(finalPage);
  }
  return results;
}
