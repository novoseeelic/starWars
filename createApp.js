import {loadResource} from './main.js';

const appContainer = document.getElementById('app');

export function renderPage(moduleName, apiUrl, css){
    Promise.all([moduleName, apiUrl, css].map(src => loadResource(src)))
      .then(async ([pageModule, data]) => {
        appContainer.innerHTML = '';
        appContainer.append(await pageModule.render(data));
      });
};