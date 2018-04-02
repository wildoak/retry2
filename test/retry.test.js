import {test} from 'ava';
import {retry} from '../src';

test('should throw for invalid first parameter', async t => {
    await t.throws(retry({invalid: 'first parameter'}));
});

test('should simple try', async t => {
    const result = await retry(async () => 'success');
    t.is(result, 'success');
});

test('should simple retry', async t => {
    let i = 0;
    const result = await retry(async () => {
        if (i++ < 1) {
            throw new Error();
        }

        return 'success';
    });

    t.is(i, 2);
    t.is(result, 'success');
});

test('should fail after max retry', async t => {
    const error = new Error();

    let i = 0;
    const thrown = await t.throws(
        retry(async () => {
            if (i++ < 1) {
                throw error;
            }

            t.fail();
        }, {max: 1})
    );
    
    t.is(i, 1);
    t.deepEqual(thrown.errors, [error]);
});

test('should fail after total time', async t => {
    const error = new Error();

    let i = 0;
    const thrown = await t.throws(
        retry(async () => {
            if (i++ < 1) {
                await new Promise(resolve => setTimeout(resolve, 15));
                throw error;
            }

            t.fail();
        }, {timeout: 10})
    );
    
    t.is(i, 1);
    t.deepEqual(thrown.errors, [error]);
});

test('should not fail before timeout', async t => {
    let i = 0;

    const result = await retry(async () => {
        if (i++ < 1) {
            await new Promise(resolve => setTimeout(resolve, 10));
            throw new Error();
        }

        return 'success';
    }, {timeout: 100});
    
    t.is(i, 2);
    t.is(result, 'success');
});

test('should delay retry', async t => {
    let i = 0;

    const start = Date.now();

    const result = await retry(async () => {
        if (i++ < 1) {
            throw new Error();
        }

        return 'success';
    }, {delay: 50});
    
    t.is(i, 2);
    t.is(result, 'success');
    t.true(Date.now() >= start + 50);
});
