const fs = require('fs-extra');
const path = require('path');
const log = require('./log');
const settings = require('./settings');

const copyAssets = async () => {
    const backCompatibilityPublicDir = path.resolve(path.join('public/Zed', settings.paths.publicPath));

    try {
        log.task('Copy assets for backward compatibility after renaming assets folder');
        log.step('copying assets...');

        await fs.copy(settings.paths.publicDir, backCompatibilityPublicDir);

        log.done('assets copied to: ', backCompatibilityPublicDir);
    } catch (err) {
        console.error(err)
    }
};

module.exports = copyAssets;
