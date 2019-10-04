# Communibase administration types generator

CLI for generating a `communibase.d.ts` for a specific administration

    yarn add @communibase/types-generator

Then 

    cbtypesgen <api-key> -D @types

Will generate `@types/communibase.d.ts` for the given api-key administration.

## Why

This project makes the following multi-cli solution easier;

1.  Generate the `swagger.json` from the administration

        npx communibase-swagger <administrationKey> `./@types/swagger.json`

2.  Generate the `swagger.d.ts` from the `swagger.json`

        npx dtsgenerator --out ./@types/swagger.d.ts ./@types/swagger.json

3.  Change the `./@types/swagger.d.ts` to export the namespace
    ```diff
    ---declare namespace Definitions {
    +++export namespace Definitions {
    ```