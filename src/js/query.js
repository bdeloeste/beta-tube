import { areaNameSelector, routeNameSelector } from './selectors';

const routeName = document.querySelector(routeNameSelector).innerText;
const area = document.querySelector(areaNameSelector).getAttribute('href').split('/').slice(-1)[0].replace(new RegExp('-', 'g'), ' ');
const routeParams = {
  part: 'snippet',
  q: `${routeName} ${area}`,
  maxResults: 5,
  type: ['video'],
};

export default routeParams;
