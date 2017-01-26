#!/usr/bin/env node
var yeoman = require('yeoman-environment');
var env = yeoman.createEnv();

env.register(require.resolve('generator-gdp-backend'), 'be:cli');

// The #lookup() method will search the user computer for installed generators.
// The search if done from the current working directory.
env.lookup(function () {
  env.run('be:cli', {'skip-install': false}, function (err) {
    console.log(err);
  });
});
