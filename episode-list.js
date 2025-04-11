import { renderPage } from "./createApp.js";

export function render(data) {
  const conteiner = document.createElement("div");
  conteiner.classList.add("conteiner");
  const title = document.createElement("h1");
  title.classList.add("title");
  title.textContent = "List of Star Wars episodes";

  conteiner.append(title);

  for (const episode of data.results){
    const epi = document.createElement('div');
    epi.classList.add('episode');
    const link = document.createElement('a');
    link.classList.add("link");
    link.innerText = "Episode " + episode.episode_id + ". " + episode.title;
    link.href = `?episodeId=${CorrectId(episode.episode_id)}`;

    link.addEventListener("click", (e) => {
      e.preventDefault();
      history.pushState(null, '', link.href);
      conteiner.innerHTML = '';
      renderPage(
        './episode-details.js', 
        `https://swapi.dev/api/films/${CorrectId(episode.episode_id)}`, 
        './style.css'
      );
    });

    epi.append(link);
    conteiner.append(epi);
  }
  
  return conteiner;
}

function CorrectId(epId){
  let id;
  if(epId == 4) id = 1;
  if(epId == 5) id = 2;
  if(epId == 6) id = 3;
  if(epId == 1) id = 4;
  if(epId == 2) id = 5;
  if(epId == 3) id = 6;
  return id;
}