import generator from "communibase-swagger";
import dtsGenerator from "dtsgenerator";

export default async options => {
  const swagger = await generator({
    apiKey: options.apiKey,
    serviceUrl: options.serviceUrl
  });

  const result = await dtsGenerator({
    contents: [JSON.stringify(swagger)]
  });

  return result;
};
