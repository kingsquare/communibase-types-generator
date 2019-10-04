// @ts-ignore
import generator, { ICBSwaggerGeneratorOptions } from "communibase-swagger";
import dtsGenerator from "dtsgenerator";

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
    specification: swagger,
    typesSource: await dtsGenerator({
      namespaceName: "Communibase",
      contents: [swagger]
    })
  };
};
