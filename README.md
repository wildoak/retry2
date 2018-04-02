# retry2



![npm](https://img.shields.io/npm/v/retry2.svg)
![node](https://img.shields.io/node/v/retry2.svg)

![Travis branch](https://img.shields.io/travis/wildoak/retry2/master.svg)
![Coveralls github](https://img.shields.io/coveralls/github/wildoak/retry2.svg)

![license](https://img.shields.io/github/license/wildoak/retry2.svg)
![GitHub tag](https://img.shields.io/github/tag/wildoak/retry2.svg)
![GitHub issues](https://img.shields.io/github/issues/wildoak/retry2.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/wildoak/retry2.svg)
![GitHub top language](https://img.shields.io/github/languages/top/wildoak/retry2.svg)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/wildoak/retry2.svg)


- [npm](https://www.npmjs.com/package/retry2)
- [GitHub](https://github.com/wildoak/retry2)

`retry2` is like [retry](https://www.npmjs.com/package/retry) but easier to use, using promises.

## Usage

`npm install retry2`

We use npm package `debug`. To make me verbose use `DEBUG=retry2`.


### Using retry
```js
await retry(
    try,
    {
        timeout, // timeout, after retry completely failed
        delay, // delay millis between retries
        max // max attempts
    }
)
```

### Simple retry using default values (10sec, 10 tries, no delay)

```js
const result = await retry(async () => await fetch('http://booting-server.local'));

// or
const result = await retry(() => fetch('http://booting-server.local'));
```

### More complex usage

```js
const sessionToken = await retry(async () => {
    await createOrUpdateUser('admin', 'passw0rd');

    return await retry(async () => await login('admin', 'passw0rd'), {delay: 100});
});
```
