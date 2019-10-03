# Communibase administration types generator

## Generate administration type definitions for development

1.  Generate the `swagger.json` from the administration

        npx communibase-swagger <administrationKey> `./@types/swagger.json`

2.  Generate the `swagger.d.ts` from the `swagger.json`

        npx dtsgenerator --out ./@types/swagger.d.ts ./@types/swagger.json

3.  Change the `./@types/swagger.d.ts` to export the namespace
    ```diff
    ---declare namespace Definitions {
    +++export namespace Definitions {
    ```