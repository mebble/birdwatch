import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import { parseQueryString } from './services/queryString';

import App from './App';

const init = parseQueryString(window.location.search);

ReactDOM.render(<App init={init} />, document.getElementById('root'));
