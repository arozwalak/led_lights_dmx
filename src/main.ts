import './scss/styles.scss';
import { App } from './app';
import * as _ from 'lodash';

const app = new App();

function component() {
    const element = document.createElement('div');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('TypeScript is working!');
  document.body.appendChild(component());
});
