const fs = require('fs');
const path = require('path');
const log = require('./log');
const settings = require('./settings');

const copyAssets = async () => {
    const src = path.resolve(settings.paths.publicDir);
    const dest = path.resolve(path.join('public/Zed', settings.paths.publicPath));

    try {
        log.task('Copy assets for backward compatibility after renaming assets folder');
        log.step('copying assets...');

        await fs.promises.rm(dest, { recursive: true, force: true });
        await fs.promises.cp(src, dest, {
            recursive: true,
            dereference: false,
            verbatimSymlinks: true,
        });

        log.done('assets copied to: ', dest);
    } catch (err) {
        console.error(err);
    }
};

module.exports = copyAssets;
