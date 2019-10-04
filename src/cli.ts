import * as fs from "fs";
import * as path from "path";
import runner, { CBTypesGeneratorOptions } from "./index";

// do this to remove the deprecation warning;
//
// "In future major releases of yargs, "parsed" will be a private field. Use the return value of ".parse()" or ".argv" instead"
//
// TypeScript was triggering this warning, because it would copy all of the module properties
// to a variable if you did this import * as yargs from 'yargs';.
import yargs = require("yargs");

// @ts-ignore
const options: CBTypesGeneratorOptions = yargs
  .usage("Usage: $0 <apiKey> [options]")
  .option("apiKey", {
    alias: "a",
    type: "string",
    description: "The communibase api key"
  })
  .demandOption("apiKey", "Missing communibase api-key")
  .option("output", {
    alias: "o",
    type: "string",
    description: "Write to output"
  })
  .option("service_url", {
    alias: "u",
    type: "string",
    description: "use this Communibase service url"
  })
  .option("verbose", {
    alias: "v",
    type: "boolean",
    description: "Run with verbose logging"
  }).argv;

runner(options)
  .then(tsString => {
    if (options.output) {
      fs.writeFileSync(path.resolve(options.output), tsString);
      console.log(`Created ${path}`);
      process.exit();
    }
    console.log(tsString);
    process.exit();
  })
  .catch(err => {
    console.error(err);
  });
