// es6 promise polyfill is only required
// when using karma-phantomjs-launcher
require('isomorphic-fetch');

// see https://github.com/webpack/karma-webpack#alternative-usage

const testsContext = require.context('.', false, /\.test\.js$/);

testsContext.keys().forEach(testsContext);
