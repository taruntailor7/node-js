console.log(module, 'module');
// module.exports is an object 

// Some built-in modules
// OS, PATH. FS, HTTP

const os = require('os');
const path = require('path');
const fs = require('fs');
const http = require('http');

// console.log(os, 'os'); 
console.log(path, 'path');
// console.log(fs, 'fs');
// console.log(http, 'http');

// lodash module

const _ =  require('lodash');

const items = [1, [2, [3, [4]]]];
const newItems = _.flatMapDeep(items);

console.log(newItems, 'newItems'); 