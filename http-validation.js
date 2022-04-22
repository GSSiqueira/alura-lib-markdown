function getLinks(data) {
  const links = [];
  for (let page = 0; page < data.length; page++) {
    links.push(data[page].map((link) => Object.values(link).join()));
  }
  return links;
}

export default function checkURLs(data) {
  return getLinks(data);
}
