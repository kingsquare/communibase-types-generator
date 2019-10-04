import * as yargs from "yargs";
import * as fs from "fs";
import * as path from "path";

import runner from "./index";
import { Argv } from "yargs";

// Argv<{ output: string; } & { service_url: string; } & { verbose: boolean; }>

interface CBTypesGenerator {
  apiKey: string;
  output?: string;
  service_url?: string;
  verbose?: boolean;
}

const options: Argv<CBTypesGenerator> = yargs
  .usage("Usage: $0 <apiKey> [options]")
  .option("apiKey", {
    alias: "a",
    type: "string",
    description: "The communibase api key"
  })
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
  });

runner(options)
  .then(tsString => {
    if (!options.output) {
      process.stdout.write(tsString);
      process.exit();
    }
    fs.writeFileSync(path.resolve(options.output), tsString);
    process.stdout.write(tsString);
    process.exit();
  })
  .catch(err => {
    console.error(err);
  });
