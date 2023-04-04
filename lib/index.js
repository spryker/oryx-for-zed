const webpack = require('webpack');
const webpackVersion = require('webpack/package').version;
const log = require('./log');
const build = require('./build');
const copyAssets = require('./copy');
const pkg = require('../package');

log.info(pkg.name, pkg.version);
build.loadCompiler(webpack, webpackVersion);

const settings = require('./settings');
const getConfiguration = require('./webpack.config');

module.exports = {
    settings,
    getConfiguration,
    build,
    copyAssets,
};
