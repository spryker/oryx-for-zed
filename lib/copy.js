const fs = require('fs-extra');
const path = require('path');
const oryx = require('@spryker/oryx');
const settings = require('./settings');

const copyAssets = async () => {
    const backCompatibilityPublicDir = path.resolve(path.join('public/Zed', settings.paths.publicPath));

    try {
        oryx.log.task('Copy assets for backward compatibility after renaming assets folder');
        oryx.log.step('copying assets...');
        await fs.copy(settings.paths.publicDir, backCompatibilityPublicDir);
        oryx.log.done('assets copied to: ', backCompatibilityPublicDir);
    } catch (err) {
        console.error(err)
    }
};

module.exports = copyAssets;
