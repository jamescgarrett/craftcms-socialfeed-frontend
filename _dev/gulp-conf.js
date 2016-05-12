'use strict';

import util from 'gulp-util';

export default {
    production: !!util.env.production,
    proxyHost: 'plugindev.craft.dev',
    jsEntry: 'src/js/socialfeed.js',
    jsAll: ['src/js/**/*.js'],
    jsBundle: 'socialfeed.js',
    cssEntry: 'src/css/style.css',
    cssAll: 'src/css/**/*.css',
    jsDist: '../src/js',
    cssDist: '../dist/src/css'
};