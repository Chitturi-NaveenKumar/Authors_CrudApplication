const express = require("express");
const { postgraphile } = require("postgraphile");
const ConnectionFilterPlugin = require("postgraphile-plugin-connection-filter");
const PgSimplifyInflectorPlugin = require("@graphile-contrib/pg-simplify-inflector");
const PostGraphileNestedMutations = require("postgraphile-plugin-nested-mutations");
const app = express();

app.use(express.json());
app.use(
  postgraphile(
    process.env.DATABASE_URL || "postgres://CH20408545@localhost:5432/learn",
    "test_schema",
    {
      watchPg: true,
      graphiql: true,
      enhanceGraphiql: true,
      simpleCollections: "both",
      appendPlugins: [
        ConnectionFilterPlugin,
        PgSimplifyInflectorPlugin,
        PostGraphileNestedMutations,
      ],
      graphileBuildOptions: {
        pgOmitListSuffix: true,
        pgShortPk: true,
        connectionFilterUseListInflectors: true,

        connectionFilterRelations: true,

        connectionFilterLogicalOperators: true,

        connectionFilterAllowEmptyObjectInput: true,
      },
    }
  )
);

app.listen(process.env.PORT || 3001, () => {
  console.log("connected");
});
