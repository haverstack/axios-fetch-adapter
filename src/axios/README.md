# axios

Due to the problems described in [this PR](https://github.com/haverstack/axios-fetch-adapter/pull/3), we aren't able to use the `axios` library directly as a dependency or peer dependency. To retain some of the expected functionality for Axios adapters, a small selection of `axios` files have been copied to this repo.

The copied `axios` files are from the `v1.x` branch and were accessed on 2022-12-24. They have been left unedited except for a few import resolution fixes and a copy of the `axios` MIT license is also reproduced here.

These `axios` files are not run through tests for this repo and do not contribute to test coverage percentage.
