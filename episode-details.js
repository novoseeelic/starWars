import { renderPage } from "./createApp.js";

export function render(data) {

  function loadResource(src) {
    return fetch(src).then(res => res.json());
  }

  const container = document.createElement("div");
  container.classList.add("container");

  // Заголовок эпизода
  const title = document.createElement("h1");
  title.classList.add("title");
  title.textContent = `Episode ${data.result.properties.episode_id}. ${data.result.properties.title}`;

  // Кнопка "Назад"
  const back = document.createElement("a");
  back.classList.add("back");
  back.textContent = "Back to episodes";
  back.href = "index.html";
  back.addEventListener("click", (e) => {
    e.preventDefault();
    history.pushState(null, '', back.href);
    container.innerHTML = '';
    renderPage(
      './episode-list.js', 
      'https://swapi.tech/api/films', 
      './style.css'
    );
  });

  // Описание эпизода
  const descr = document.createElement("p");
  descr.classList.add("text");
  descr.textContent = data.result.properties.opening_crawl;

  container.append(back, title, descr);

  const planetsSection = document.createElement("div");
  const planetsHead = document.createElement("h2");
  planetsHead.classList.add("header");
  planetsHead.textContent = "Planets";
  const planetsDOM = document.createElement("p");
  planetsDOM.classList.add("text");
  planetsDOM.textContent = "Loading planets...";
  planetsSection.append(planetsHead, planetsDOM);
  container.append(planetsSection);

  const planetsPromise = Promise.all(
    data.result.properties.planets.map(url => loadResource(url))
  ).then(planets => {
    planetsDOM.textContent = planets
      .map(p => p.result.properties.name)
      .join(", ");
  });

  if (data.result.properties.species?.length) {
    const speciesSection = document.createElement("div");
    const speciesHead = document.createElement("h2");
    speciesHead.classList.add("header");
    speciesHead.textContent = "Species";
    const speciesDOM = document.createElement("p");
    speciesDOM.classList.add("text");
    speciesDOM.textContent = "Loading species...";
    speciesSection.append(speciesHead, speciesDOM);
    container.append(speciesSection);

    const speciesPromise = Promise.all(
      data.result.properties.species.map(url => loadResource(url))
    ).then(species => {
      speciesDOM.textContent = species
        .map(s => s.result.properties.name)
        .join(", ");
    });
  }

  return container;
}
