import './scss/styles.scss';
import { App } from './app';
import * as _ from 'lodash';

const app = new App();

document.addEventListener('DOMContentLoaded', () => {
  app.init();
});