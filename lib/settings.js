const fs = require('fs');
const path = require('path');
const argv = require('yargs').argv;
const log = require('./log');

const isVerbose = !!argv.verbose;
const rootDir = process.cwd();
const sourcePath = './assets/Zed/';
const publicPath = '/assets/';
const sourceDir = path.resolve(sourcePath);
const publicDir = path.resolve(path.join('public/Backoffice', publicPath));
const ecoDir = path.resolve('./vendor/spryker-eco');
const sdkDir = path.resolve('./vendor/spryker-sdk');

let bundlesPath = './vendor/spryker/';
let featuresPath = './vendor/spryker/';
let guiFolder = 'gui';

if (!fs.existsSync(path.resolve(bundlesPath, guiFolder))) {
    log.step('spryker core: no-bundle-split layout detected');

    bundlesPath = './vendor/spryker/spryker/Bundles/';
    featuresPath = './vendor/spryker/spryker/Features/';
    guiFolder = 'Gui';
}

const bundlesDir = path.resolve(bundlesPath);
const featuresDir = path.resolve(featuresPath);
const guiPath = path.join(bundlesPath, guiFolder);

const isBootstrapLatest = process.env.BOOTSTRAP_VERSION === '5';
const excludePattern = isBootstrapLatest ? '!**/Zed/**/spryker-zed-gui-commons.entry.js' : '!**/Zed/**/spryker-zed-gui-commons-bootstrap-compatibility.entry.js';

const settings = {
    options: {
        isProduction: !!argv.prod,
        isWatching: !!argv.dev,
        isVerbose,
    },

    paths: {
        guiFolder,
        sourcePath,
        publicPath,
        bundlesPath,
        guiPath,
        rootDir,
        sourceDir,
        publicDir,
        bundlesDir,
        ecoDir,
        sdkDir,
        featuresPath,
    },

    runtimeEntryName: isBootstrapLatest ? 'spryker-zed-gui-commons-bootstrap-compatibility' : 'spryker-zed-gui-commons',

    entry: {
        dirs: [bundlesDir, ecoDir, sdkDir, featuresDir],
        patterns: ['**/Zed/**/*.entry.js', excludePattern],
        description: 'looking for entry points...',
        defineName: p => path.basename(p, '.entry.js'),
    },

    resolveModules: {
        dirs: [bundlesDir, featuresDir],
        patterns: ['**/Zed/node_modules'],
        description: 'resolving core modules deps...',
    },
}

module.exports = settings;
