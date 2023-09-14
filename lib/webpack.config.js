const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const find = require('./find');
const configurePaths = require('./configure-paths');

let NodePolyfillPlugin;

try {
    NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
} catch (e) {}

async function getConfiguration(settings) {
    let mode = 'development';
    let devtool = 'inline-source-map';

    if (settings.options.isProduction) {
        mode = 'production';
        devtool = false;
    }

    const entryPromise = find(settings.entry);
    const modulesPromise = find(settings.resolveModules, []);
    const [entryPaths, modulesPaths] = await Promise.all([entryPromise, modulesPromise]);

    let config = {
        context: settings.paths.rootDir,
        mode,
        devtool,
        stats: settings.options.isVerbose ? 'verbose' : 'errors-only',
        watch: settings.options.isWatching,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 500,
            ignored: /(node_modules)/,
        },

        entry: configurePaths(entryPaths, settings.runtimeEntryName),

        output: {
            path: settings.paths.publicDir,
            filename: './js/[name].js',
        },

        resolve: {
            modules: [
                ...modulesPaths,
                'node_modules/@spryker/oryx-for-zed/node_modules',
                'node_modules',
                settings.paths.sourcePath,
                settings.paths.bundlesPath,
            ],
            extensions: ['.js', '.css', '.scss'],
            alias: {
                ZedGui: `${settings.paths.guiFolder}/assets/Zed/js/modules/commons`,
                ZedGuiEditorConfiguration: `${settings.paths.guiFolder}/assets/Zed/js/modules/editor`,
                ZedGuiModules: `${settings.paths.guiFolder}/assets/Zed/js/modules`,
                jQuery: 'jquery',
            },
        },

        resolveLoader: {
            modules: [
                'node_modules/@spryker/oryx-for-zed/node_modules',
                'node_modules',
            ],
        },

        module: {
            rules: [
                {
                    test: /datatables\.net.*/,
                    use: 'imports-loader?define=>false',
                },
                {
                    test: /(jquery-migrate)/,
                    use: 'imports-loader?define=>false',
                },
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            presets: ['@babel/env'],
                        },
                    },
                },
                {
                    test: /\.s?css/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [require('autoprefixer')],
                                },
                            },
                        },
                        {
                            loader: 'resolve-url-loader',
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                implementation: require('sass'),
                                sourceMap: true,
                            },
                        },
                    ],
                },
                {
                    test: /\.(ttf|woff2?|eot|svg|otf)\??(\d*\w*=?\.?)+$/i,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name].[ext]',
                            publicPath: settings.paths.publicPath,
                        },
                    }],
                },
                {
                    test: /\.(jpe?g|png|gif|svg)\??(\d*\w*=?\.?)+$/i,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: 'img/[name].[ext]',
                            publicPath: settings.paths.publicPath,
                        },
                    }],
                },
            ],
        },

        optimization: {
            runtimeChunk: {
                name: settings.runtimeEntryName,
            },
            concatenateModules: false,
            splitChunks: {
                cacheGroups: {
                    default: false,
                    defaultVendors: false,
                    commons: {
                        name: settings.runtimeEntryName,
                    },
                },
            },
        },

        plugins: [
            new webpack.DefinePlugin({
                DEV: !settings.options.isProduction,
                WATCH: settings.options.isWatching,
                'require.specified': 'require.resolve',
            }),

            new webpack.ProvidePlugin({
                // jquery global
                $: 'jquery',
                jQuery: 'jquery',

                // legacy provider
                SprykerAjax: `${settings.paths.guiFolder}/assets/Zed/js/modules/legacy/SprykerAjax`,
                SprykerAjaxCallbacks: `${settings.paths.guiFolder}/assets/Zed/js/modules/legacy/SprykerAjaxCallbacks`,
                SprykerAlert: `${settings.paths.guiFolder}/assets/Zed/js/modules/legacy/SprykerAlert`,
            }),

            new MiniCssExtractPlugin({
                filename: `./css/[name].css`,
            }),

            NodePolyfillPlugin ? new NodePolyfillPlugin() : null,
        ],
    };

    if (settings.options.isProduction) {
        config.optimization = {
            ...config.optimization,

            minimizer: [
                new TerserPlugin({
                    parallel: true,
                    extractComments: false,
                    terserOptions: {
                        ecma: 5,
                        output: {
                            comments: false,
                            beautify: false,
                        },
                    },
                }),

                new CssMinimizerPlugin({
                    minimizerOptions: {
                        preset: [
                            'default',
                            {
                                discardComments: { removeAll: true },
                            },
                        ],
                    },
                }),
            ],
        };
    }

    return config;
}

module.exports = getConfiguration;
