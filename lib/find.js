const path = require('path');
const fastGlob = require('fast-glob');
const log = require('./log');

const cwd = process.cwd();

function parseSettings(settings) {
    return Object.assign({}, {
        glob: { onlyFiles: false },
    }, settings);
}

async function fastGlobAsync(patterns, rootConfiguration) {
    try {
        return await fastGlob(patterns, rootConfiguration);
    } catch(error) {
        log.error('An error occurred while globbing the system for entry points.', error);
    }
}

async function glob(configuration, dirs, patterns) {
    return await dirs.reduce(async (resultsPromise, dir) => {
        const relativeRoot = dir.replace(cwd, '.');

        log.debug('searching in', `${relativeRoot}...`);

        const rootConfiguration = { ...configuration, cwd: dir };
        const results = await resultsPromise;
        const fastGlobPath = await fastGlobAsync(patterns, rootConfiguration);
        const fastGlobFullPath = fastGlobPath.map(result => path.join(dir, result));

        return results.concat(fastGlobFullPath);
    }, Promise.resolve([]));
}

function toObject(paths, defineName) {
    return paths.reduce((object, currentPath) => {
        const name = defineName ? defineName(currentPath) : path.basename(currentPath);

        object[name] = currentPath;

        return object;
    }, {});
}

async function find(settings, initial = {}) {
    const parsedSettings = parseSettings(settings);

    log.debug('settings:', parsedSettings);

    let results = await glob(parsedSettings.glob, parsedSettings.dirs, parsedSettings.patterns);
    let count = 0;

    log.task('find');
    log.debug('initial:', initial);

    if (parsedSettings.description) {
        log.step(parsedSettings.description);
    }

    if (Array.isArray(initial)) {
        results = initial.concat(results);
        count = results.length;
    } else {
        results = Object.assign({}, initial, toObject(results, parsedSettings.defineName));
        count = Object.keys(results).length;
    }

    log.debug('results:', results);
    log.done(count, 'found');

    return results;
}

module.exports = find;
