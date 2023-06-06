const express = require("express");
const { postgraphile } = require("postgraphile");
const dotenv = require("dotenv");
const ConnectionFilterPlugin = require("postgraphile-plugin-connection-filter");
const PgSimplifyInflectorPlugin = require("@graphile-contrib/pg-simplify-inflector");
const PostGraphileNestedMutations = require("postgraphile-plugin-nested-mutations");
const cors = require("cors");
dotenv.config();

const app = express();

app.use(express.json());
app.use("*", cors());
app.use(
  postgraphile(
    process.env.DATABASE_URL || "postgres://CH20408545@localhost:5432/learn",
    process.env.SCHEMA,
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

app.listen(process.env.PORT, () => {
  console.log("connected");
});
