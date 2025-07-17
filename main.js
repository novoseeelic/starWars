import { renderPage } from "./createApp.js";

const cssPromise = {};

export function loadResource(src){

  if (src.endsWith('.js')){
    return import(src);
  } else if (src.endsWith('.css')){
    if (!cssPromise[src]){
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = src;
      cssPromise[src] = new Promise (resolve => {
        link.addEventListener('load', () => resolve());
      });
      document.head.append(link);
      return cssPromise[src];
    }
  } else {
    return fetch(src).then(res => res.json());
  }
  
}

const searchParams = new URLSearchParams(location.search);
const episodeId = searchParams.get('episodeId');

if (episodeId) {
  renderPage(
    './episode-details.js', 
    `https://swapi.tech/api/films/${episodeId}`, 
    './style.css'
  );
}
else {
  renderPage(
    './episode-list.js', 
    `https://swapi.tech/api/films`, 
    './style.css'
  );
}
