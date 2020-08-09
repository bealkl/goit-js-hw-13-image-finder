'use strict';

const fetchImg = (query, page, key) => {
  const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${query}&page=${page}&per_page=12&key=${key}`;

  return fetch(url)
    .then(response => response.json())
    .then(data => data.hits)
    .catch(err => console.warn(err)); // jshint ignore:line
};
export default fetchImg;
