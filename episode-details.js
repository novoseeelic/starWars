import { renderPage } from "./createApp.js";

export function render(data) {

  function loadResource(src) {
    return fetch(src).then(res => res.json());
  }

  const cont = Promise.all(
    [data.planets, data.species].map((item) =>
      Promise.all(item.map((src) => loadResource(src)))
    )
  ).then(([planets, species])  => {
    const conteiner = document.createElement("div");
    conteiner.classList.add("conteiner");

    const title = document.createElement("h1");
    title.classList.add("title");
    title.innerText = "Episode " + data.episode_id + ". " + data.title;

    const back = document.createElement("a");
    back.classList.add("back");
    back.innerText = "Back to episodes";
    back.href = "index.html";
    back.addEventListener("click", (e) => {
      e.preventDefault();
      history.pushState(null, '', back.href);
      conteiner.innerHTML = '';
      renderPage(
        './episode-list.js', 
        `https://swapi.dev/api/films`, 
        './style.css'
      );
    });
    
    const descr = document.createElement("p");
    descr.classList.add("text");
    descr.innerText = data.opening_crawl;

    const planetsHead = document.createElement("h2");
    planetsHead.classList.add("header");
    planetsHead.innerText = "Planets";

    const planetsDOM = document.createElement("p");
    planetsDOM.classList.add("text");

    let epPlanets = "";
    planets.forEach(element => {
      if (epPlanets == "") epPlanets = epPlanets + element.name;
      else epPlanets = epPlanets + ", " + element.name;
    });

    const speciesHead = document.createElement("h2");
    speciesHead.classList.add("header");
    speciesHead.innerText = "Species";

    const speciesDOM = document.createElement("p");
    speciesDOM.classList.add("text");

    let epSpecies = "";
    species.forEach(element => {
      if (epSpecies == "") epSpecies = epSpecies + element.name;
      else epSpecies = epSpecies + ", " + element.name;
    });

    planetsDOM.innerText = epPlanets;
    speciesDOM.innerText = epSpecies;
    conteiner.append(back);
    conteiner.append(title);
    conteiner.append(descr);
    conteiner.append(planetsHead);
    conteiner.append(planetsDOM);
    conteiner.append(speciesHead);
    conteiner.append(speciesDOM);

    return conteiner;
  });

  return cont;
}
