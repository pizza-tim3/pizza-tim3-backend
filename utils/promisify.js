//this function wraps another function in a promise
const promisify = fn => new Promise((resolve, reject) => fn(resolve));

module.exports = promisify;
