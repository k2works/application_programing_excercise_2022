const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const env = process.env.NODE_ENV || "development";
const isDevelopment = env === "development";

module.exports = {
  mode: env,
  target: ["web", "es5"],
  devtool: isDevelopment ? "source-map" : false,
  entry: {
    public: "./src/client/index.tsx",
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "public"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/client/index.html",
      filename: "index.html",
    }),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { url: false },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
      },
    ],
  },
};
