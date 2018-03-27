#! /usr/bin/env node
const fs = require("fs");
const helpers = require("./helpers");
const exec = require("child_process").exec;
const argv = require("minimist")(process.argv.slice(2));
const path = process.argv.slice(2)[0];

const writeToFile = (path, templateFn, ext, options = null) => {
  path = path + ext;

  const child = exec("touch " + path, (err, stdout, stderr) => {
    if (err) {
      console.log(err);
    }

    let options;
    let name;
    let nameWithoutExtension;

    if (options) {
      options = helpers.getOptionsByName(argv.options);
    }

    name = helpers.getFilename(path);
    nameWithoutExtension = helpers.removeExtension(name);

    fs.writeFile(path, templateFn(nameWithoutExtension, opts), err => {
      if (err) {
        console.log(err);
      }
    });
  });
};

writeToFile(path, helpers.template, ".vue", argv.options);

if (argv.t) {
  writeToFile(path, helpers.testTemplate, ".test.js", argv.options);
}
