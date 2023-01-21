'use strict'

const yaml = require("js-yaml");
const fs = require("fs");

function loadConfig(file) {
  try {
    return yaml.load(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    console.log(e);
  }
}

module.exports = loadConfig;