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

## Acknowledgements
The code in this repo draws heavily from the following projects:
- [vespaiach/axios-fetch-adapter](https://github.com/vespaiach/axios-fetch-adapter): Most of the code in this repo was copied from here. Licensed MIT.
- [axios/axios](https://github.com/axios/axios): Rather than import `axios` for this repo, the necessary types and utility functions were copied directly. Licensed MIT.

## License
[MIT](LICENSE)
