#!/usr/bin/env node

var argv = process.argv
if(!argv[2]) {
  throw new Error('Insufficient arguments');
}
var app = require('../../package');
var spawn = require('child_process').spawn;
console.log(__dirname)
var rsyncParamList = [
  '-azvrRP',
  '--link-dest=..', // hard-link
  '--include=/*', // include top most dir structure
  '--delete',
  '--delete-excluded'
];
Object.keys(app.dependencies).forEach(function(dep) {
  rsyncParamList.push('--include=' + dep + '');
  rsyncParamList.push('--include=' + dep + '/**');
});
rsyncParamList.push(
  '--exclude=*',
  'node_modules',
  argv[2]
);
var rsync = spawn('rsync', rsyncParamList, { stdio: 'inherit' });
