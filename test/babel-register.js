const { JSDOM } = require('jsdom');
const register = require('@babel/register');

const { window, window: { document } } = new JSDOM('<div id="app"></div>', { url: 'http://localhost' });

register({ extensions: ['.ts', '.tsx', '.js', '.jsx'] });
global.window = window;
global.document = document;
