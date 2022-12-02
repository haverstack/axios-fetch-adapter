# axios-fetch-adapter
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
- [axios/axios](https://github.com/axios/axios): Rather than import `axios` for this repo, the necessary types were copied directly. Licensed MIT.

## License
[MIT](LICENSE)
