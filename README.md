# retry2

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
