'use strict';

const build = require('./lib/build');
const api = require('./lib');

// deprecated copyAssetsCallback for backward compatibility only
const copyAssetsCallback = require('./lib/copy');

api.getConfiguration(api.settings)
    .then(configuration => build(configuration, copyAssetsCallback))
    .catch(error => {
        console.error('An error occurred while creating configuration', error);
        process.exit(1);
    });
