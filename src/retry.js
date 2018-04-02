import debug from './debug';

const waitMillis = async millis => await new Promise(resolve => setTimeout(resolve, millis));

export default async (try_, {timeout = 10000, delay = 0, max = 10} = {}) => {

    if (typeof try_ !== 'function') {
        throw new TypeError('try parameter has to be a function');
    }

    let i = 0;

    const now = Date.now();
    let errors = [];

    while (now + timeout > Date.now() && i < max) {
        try {
            ++i;
            return await try_();
        } catch (e) {
            debug('try %d failed', i);
            errors.push(e);
        }

        debug('wait %d ms', delay);
        await waitMillis(delay);
    }

    const err = new Error('retry failed ' + i + ' times');
    err.errors = errors;
    throw err;
};
