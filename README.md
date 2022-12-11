# axios-fetch-adapter
[![npm badge](https://img.shields.io/npm/v/@haverstack/axios-fetch-adapter)](https://www.npmjs.com/package/@haverstack/axios-fetch-adapter)
[![checks badge](https://img.shields.io/github/checks-status/haverstack/axios-fetch-adapter/main)](https://github.com/haverstack/axios-fetch-adapter/actions)
[![codecov badge](https://codecov.io/gh/haverstack/axios-fetch-adapter/branch/main/graph/badge.svg?token=J2J0ANDB3F)](https://codecov.io/gh/haverstack/axios-fetch-adapter)
[![license badge](https://img.shields.io/github/license/haverstack/axios-fetch-adapter)](./LICENSE)

An Axios adapter that uses native `fetch`. Useful for Cloudflare Workers and ServiceWorker environments.

## Install
```sh
npm install @haverstack/axios-fetch-adapter
```

## Use
```javascript
import axios from "axios";
import fetchAdapter from "@haverstack/axios-fetch-adapter";

const client = axios.create({
  adapter: fetchAdapter
});
```

To use with the Square API:
```javascript
import { Client, Environment } from "square";
import fetchAdapter from "@haverstack/axios-fetch-adapter";

const client = new Client({
  accessToken,
  environment,
  unstable_httpClientOptions: { adapter: fetchAdapter }
});
```

## Development
```sh
# Run tests
npm run test

# Check tests, linting, and formatting
npm run check

# Fix linting and formatting
npm run fix
```

A [Miniflare](https://miniflare.dev) testing environment is used in order to simulate a Cloudflare Worker or a ServiceWorker. This testing environment is also useful because Node does not have a native implementation of `fetch`.

## Acknowledgements
The code in this repo draws heavily from the following projects:
- [vespaiach/axios-fetch-adapter](https://github.com/vespaiach/axios-fetch-adapter): Most of the initial code in this repo was copied from here. Licensed MIT.
- [axios/axios](https://github.com/axios/axios): Rather than import `axios` for this repo, the necessary types and utility functions were copied directly. Licensed MIT.

## License
[MIT](LICENSE)
