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

const pkg = require("../package.json");

// @ts-ignore
const options: CBTypesGeneratorOptions = yargs
  .version(pkg.version)
  .usage("Usage: $0 <apiKey> [options]")
  .demandOption("apiKey")
  .option("apiKey", {
    alias: "k",
    type: "string",
    description: "The communibase api key"
  })
  .option("output", {
    alias: "o",
    type: "string",
    description: "Write types to output file (if not set is written to stdout)",
    default: "communibase.d.ts"
  })
  .option("outputDir", {
    alias: "D",
    type: "string",
    description: "Write output to directory"
  })
  .option("emitSpec", {
    alias: "S",
    type: "string",
    description: "Write specification to output file (only if set)",
    default: "communibase.spec.json"
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
  .then(({ specification, typesSource }) => {
    // const outputPath = path.resolve(options.output);
    // fs.writeFileSync("swagger.json", JSON.stringify(specification, null, 2), {
    //   encoding: "utf8",
    //   flag: "w"
    // });
    // if (options.emitSpec) {
    //     fs.writeFileSync(path.resolve(outputPath), JSON.stringify(specification, null, 2));
    //     console.log(`Created ${options.output}`);
    // }
    if (options.output) {
      const outputPath = path.resolve(options.output);
      fs.writeFileSync(path.resolve(outputPath), typesSource);
      console.log(`Created ${path.resolve(outputPath)}`);
      process.exit();
    }
    console.log(typesSource);
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
