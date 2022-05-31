# Changelog

### 2.12.0
Released on 31.05.2022

- Updated `@babel/core` dependency.
- Updated `@babel/preset-env` dependency.
- Updated `babel-loader` dependency.
- Updated `sass` dependency.
- Adjusted webpack config for jQuery scope.


### 2.11.4
Released on 7.04.2022

- Downgraded `optimize-css-assets-webpack-plugin` version to keep build working in production mode.


### 2.11.4
Released on 18.03.2022

- Replaced deprecated `node-sass` dependency with `dart-sass`. 


### 2.11.3
Released on 12.08.2021

- Removed backward compatibility script for Merchant Portal assets.
- Fixed bug with not defined settings in datatables by adding additional module rule. 


### 2.11.2
Released on 22.07.2021

- Fixed backward compatibility script for the new Merchant Portal endpoint.


### 2.11.1
Released on 07.07.2021

- Added missing dependency: `fs-extra`.


### 2.11.0
Released on 24.06.2021

- Changed destination folder for built assets according to new application endpoint name.


### 2.10.1
Released on 23.06.2021

- Fixed wrong release.


### 2.10.0
Released on 23.06.2021

- Added an ability to gather entry-points from spryker-sdk namespace.  


### 2.9.1
Released on 11.01.2021

- Downgraded `resolve-url-loader` 3.1.2 -> 2.3.2 to prevent build fail.


### 2.9.0
Released on 15.12.2020

- Removed `stylelint` and `eslint` dependencies.
- Introduced `babel-loader` into the webpack builder.
- Added following dependencies: `@babel/core`, `@babel/preset-env`, `babel-loader`.
- Updated dependency `resolve-url-loader` 2.3.0 -> 3.1.2.


### 2.8.1
Released on 28.09.2020

Fixed path pattern for eco modules.  


### 2.8.0
Released on 22.09.2020

Updated stylelint dependency.
Replaced deprecated `uglifyjs-webpack-plugin` with `terser-webpack-plugin` dependency. 

Updated dependency:
- `stylelint`: `12.0.1` => `13.7.1`


### 2.7.0
Released on 12.08.2020

Updated node.js and npm constraints.

Updated dependency:
- `node`: `8.9.0` => `12.0.0`
- `npm`: `5.6.0` => `6.9.0`


### 2.6.0
Released on 20.07.2020

Added tslint and stylelint configurations.

Updated dependency:
- `node-sass`: `4.13.0` => `4.14.1`

Added dependencies:
- `eslint`
- `globby`
- `stylelint`


### 2.5.3
Released on 27.10.2020

Updated dependency:
- `node-sass`: `4.10.0` => `4.13.0`

### 2.5.2
Released on 26.12.2019

Updated package-lock.json.

### 2.5.1
Released on 24.10.2019

Updated package-lock.json.

### 2.5.0
Released on 23.10.2019

Fixed duplicated slash in fonts and images path.  

Updated dependency:
- `@spryker/oryx`: `1.3.0` => `1.4.0`

### 2.4.1
Updated patch version due to wrong release.

### 2.4.0
Released on 12.09.2019

Updated dependency:
- `yargs`: `11.0.0` => `13.3.0`

### 2.3.0
Released on 13.06.2019

Extend configuration to search entry points in spryker-eco namespace.

Update dependencies:
- `css-loader`: `0.28.10` => `2.1.1`
- `optimize-css-assets-webpack-plugin`: `4.0.0` => `5.0.1`

### 2.2.0
Released on 10.12.2018

- update dependencies
	- @spryker/oryx 1.2.0 > 1.3.0
	- node-sass 4.8.3 > 4.10.0
	- webpack 4.6.0 > 4.27.0

### 2.1.0
Released on 20.04.2018

- update dependencies
	- @spryker/oryx 1.1.0 > 1.2.0

### 2.0.0  
Released on 20.04.2018

Update the tool and make it working with webpack 4. Configuration and all dependencies are updated accordingly. See `package.json` for more details.

### 1.1.1
Released on 28.09.2017

- add fix for [`jquery-migrate` 3.0.1](https://github.com/jquery/jquery-migrate/issues/273)
- add dependecy:
    - imports-loader ~0.7.1

### 1.1.0
Released on 30.05.2017

- add support for node ^7.0.0
- update dependecies:
    - @spryker/oryx ^1.0.0 => ^1.1.0

### 1.0.0
Released on 21.04.2017

- documentation moved to [spryker.github.io/user-interface/oryx/for-zed](http://spryker.github.io/user-interface/oryx/for-zed)
- update dependecies:
    - @spryker/oryx ^0.4.9 => ^1.0.0

### 0.5.8 (beta)
Released on 30.03.2017

- remove handler for `oryx.build()` promise
- update dependecies:
    - @spryker/oryx ^0.4.8 => ^0.4.9

### 0.5.7 (beta)
Released on 30.03.2017

- handle `oryx.build()` promise
- use `oryx.build.loadCompiler()` to load webpack
- update dependecies:
    - @spryker/oryx ^0.4.4 > ^0.4.8

### 0.5.6 (beta)
Released on 29.03.2017

- update webpack commonsChunckPlugin configuration

### 0.5.5 (beta)
Released on 29.03.2017

- update webpack configuration to remove errors introduced due to webpack update
- update dependecies:
    - webpack ~2.2.0 > ~2.3.2

### 0.5.4 (beta)
Released on 07.03.2017

- update dependecies:
    - @spryker/oryx ^0.4.3 > ^0.4.4

### 0.5.3 (beta)
Released on 07.03.2017

- update dependecies:
    - @spryker/oryx ^0.4.0 > ^0.4.3

### 0.5.2 (beta)
Released on 07.03.2017

- update dependecies:
    - @spryker/oryx ^0.3.0 > ^0.4.0

### 0.5.1 (beta)
Released on 07.03.2017

- remove `extract-text-webpack-plugin` deprecations in `webpack.config.js` file
- update engines:
    - npm >=3.0.0
    - remove yarn

### 0.5.0 (beta)
Released on 07.03.2017

- update dependencies in package.json:
    - extract-text-webpack-plugin 2.0.0-beta.5 > 2.1.0
    - file-loader 0.9.0 > 0.10.1               
    - node-sass 4.3.0 > 4.5.0           
    - postcss-loader 1.2.2 > 1.3.3      
    - resolve-url-loader 1.6.1 > 2.0.2   
    - sass-loader 4.1.1 > 6.0.2     
    - yargs 6.6.0 > 7.0.1
- update engines:
    - npm ^3.0.0
    - yarn >= 0.19.0
- update yarn.lock file
- add CHANGELOG.md

### 0.4.x (alpha)
Released on 24.02.2017

- test alpha release
