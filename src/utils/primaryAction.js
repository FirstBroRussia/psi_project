import {deviceScreenInfoCallback} from './utils.js';

import {store} from '../store/store.js'; 
import {setCSSDOMLoadAction} from '../store/reducer.js';

window.addEventListener('DOMContentLoaded', deviceScreenInfoCallback);

window.addEventListener('load', () => {
  store.dispatch(setCSSDOMLoadAction(true));
});

window.addEventListener('resize', deviceScreenInfoCallback);
