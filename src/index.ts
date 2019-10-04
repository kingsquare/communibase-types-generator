// @ts-ignore
import generator, { ICBSwaggerGeneratorOptions } from "communibase-swagger";
import dtsGenerator from "dtsgenerator";

export interface CBTypesGeneratorOptions extends ICBSwaggerGeneratorOptions {
  apiKey: string;
  output?: string;
  serviceUrl?: string;
  verbose?: boolean;
}

export default async (options: CBTypesGeneratorOptions) =>
  await dtsGenerator({
    contents: [
      JSON.stringify(
        await generator({
          apiKey: options.apiKey,
          serviceUrl: options.serviceUrl
        })
      )
    ]
  });
