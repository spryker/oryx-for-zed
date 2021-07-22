const fs = require('fs-extra');
const path = require('path');
const oryx = require('@spryker/oryx');
const settings = require('./settings');

const copyAssets = async () => {
    const backCompatibilityZedPublicDir = path.resolve(path.join('public/Zed', settings.paths.publicPath));
    const backCompatibilityBackofficePublicDir = path.resolve(path.join('public/Backoffice', `${settings.paths.publicPath}/js/`));

    if (fs.existsSync(settings.paths.mpPublicDir)) {
        try {
            oryx.log.task('Copy Merchant Portal assets for Backoffice');
            oryx.log.step('copying assets...');
            await fs.copy(settings.paths.mpPublicDir, backCompatibilityBackofficePublicDir);
            oryx.log.done('assets copied to: ', backCompatibilityBackofficePublicDir);
        } catch (err) {
            console.error(err)
        }
    }

    try {
        oryx.log.task('Copy assets for Zed backward compatibility after renaming assets folder');
        oryx.log.step('copying assets...');
        await fs.copy(settings.paths.publicDir, backCompatibilityZedPublicDir);
        oryx.log.done('assets copied to: ', backCompatibilityZedPublicDir);
    } catch (err) {
        console.error(err)
    }
};

module.exports = copyAssets;
