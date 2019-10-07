// @ts-ignore
import generator, { ICBSwaggerGeneratorOptions } from "communibase-swagger";
import dtsGenerator from "dtsgenerator";
import * as fs from "fs";

export interface CBTypesGeneratorOptions extends ICBSwaggerGeneratorOptions {
  apiKey: string;
  serviceUrl?: string;
  output?: string;
  outputDir?: string;
  verbose?: boolean;
  emitSpec?: boolean;
}

export default async (options: CBTypesGeneratorOptions) => {
  const swagger = await generator({
    apiKey: options.apiKey,
    serviceUrl: options.serviceUrl
  });
  return {
    specification: JSON.parse(JSON.stringify(swagger)),
    typesSource: await dtsGenerator({
      namespaceName: "Communibase",
      contents: [swagger]
    })
  };
};
