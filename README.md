# nexmock

**THIS REPO HAS BEEN DEPRECATED AND HAS BEEN ARCHIVED BY THE OWNER.**

Mock http requests made using [fetch](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch) based on [fetch-mock](https://github.com/wheresrhys/fetch-mock) 

![node version](https://img.shields.io/node/v/fetch-mock.svg?style=flat-square)
[![licence](https://img.shields.io/npm/l/fetch-mock.svg?style=flat-square)](https://github.com/wheresrhys/fetch-mock/blob/master/LICENSE)

```js
fetchMock.mock('http://example.com', 200);
const res = await fetch('http://example.com');
assert(res.ok);
fetchMock.restore();
```

## Requirements

fetch-mock requires the following to run:

- [Node.js](https://nodejs.org/) 8+ for full feature operation
- [npm](https://www.npmjs.com/package/npm) (normally comes with Node.js)
- Either of the following
  - [karma-nexmock-reporter](https://github.com/NeuraLegion/karma-nexmock-reporter) (karma reporter)
  - [mocha-nexmock-reporter](https://github.com/NeuraLegion/mocha-nexmock-reporter) (mocha reporter)
  - [node-fetch](https://www.npmjs.com/package/node-fetch) when testing in a nodejs
  - A browser that supports the `fetch` API when testing in a browser

## Documentation and Usage

See the [fork website](http://www.wheresrhys.co.uk/fetch-mock/) and [example](https://github.com/NeuraLegion/fetch-mock/blob/master/example)

## License

nexmock is licensed under the [MIT](https://github.com/NeuraLegion/fetch-mock/blob/master/LICENSE) license.
Copyright © 2019, NeuraLegion

## Third-party license 

fetch-mock is licensed under the [MIT](https://github.com/NeuraLegion/fetch-mock/blob/master/LICENSE) license.
Copyright © 2019, Rhys Evans
