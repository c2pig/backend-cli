#!/usr/bin/env node
'use strict';
var yeoman = require('yeoman-environment');
var path = require('path');
var parseArgs = require('minimist')(process.argv.slice(2));
var modulePath = require.resolve('generator-gdp-backend');
var env = yeoman.createEnv();
var cmds = { 'list': [], 'gen': ['config-path', 'output', 'props'], 'configure': ['path'] };
var gens = {};
env.register(modulePath,'main');

let registerGenerator = (name) => {
  gens[name] = env.register(path.dirname(modulePath) + `/${name}/index.js`, name);
}
Object.keys(cmds).forEach((name) => {
  registerGenerator(name);
});

env.lookup(function () {
  for(let cmd in cmds) {
    if(parseArgs._.indexOf(cmd) > -1) {
      let options = {};
      cmds[cmd].forEach((opt) => {
        options[opt] = parseArgs[opt] || '';
      });
      env.run(cmd, options, function (err) {
        if(err) {
          console.log(err);
        }
      });
      break;
    }
  }
});
