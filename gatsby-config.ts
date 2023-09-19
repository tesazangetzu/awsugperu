import type { GatsbyConfig } from "gatsby";

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const config: GatsbyConfig = {
  siteMetadata: {
    title: "App Reconecta",
    description: "App Reconecta",
    siteUrl: "https://app.reconecta.cloud",
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  // TODO add "gatsby-plugin-google-gtag"
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/awsIcon.png",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
  ],
};

export default config;
