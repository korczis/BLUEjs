// Copyright, 2013-2014, by Tomas Korcak. <korczis@gmail.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

(function () {
    'use strict';

    var define = require('amdefine')(module);

    /**
     * Array of modules this one depends on.
     * @type {Array}
     */
    var deps = [
        "../core",
        '../utils',
        'node.extend',
        'path',
        'util'
    ];

    define(deps, function (Core, Utils, merge, path, util) {
        /**
         * Configuration
         * @type {ConfigModule}
         */
        var exports = module.exports = function Config(resolver) {
            Config.super_.call(this, resolver);
        };

        util.inherits(exports, Core);

        /**
         * CLI arguments - passed from user's code
         * @type {null}
         */
        exports.prototype.argsInstance = null;

        /**
         * Setups CLI - assigns options
         * @param options
         */
        exports.prototype.load = function(configPath, env) {
            if(!env) {
                env = "local";
            }

            var cfg = Utils.loadConfig(configPath, env);
            for(var prop in cfg) {
                if(cfg.hasOwnProperty(prop)) {
                    this[prop] = cfg[prop];
                }
            }

            return this;
        };

        exports.prototype.override = function(configPath, env) {
            if(!env) {
                env = "local";
            }

            var cfg = Utils.loadConfig(configPath, env);
            for(var prop in cfg) {
                if(this.hasOwnProperty(prop)) {
                    var orig = this[prop];
                    var over = cfg[prop];

                    var tmp = merge(true, orig, over);
                    this[prop] = tmp;
                }
            }

            return this;
        };
    });
}());